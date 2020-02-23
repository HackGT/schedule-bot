require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
const fetch = require('node-fetch');
const dateformat = require('dateformat');
const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');

const { secondEditEventJson, modalJson, homeJson, homeJsonBlocks, unauthorizedHomeJson, unauthorizedHomeJsonBlocks, successJson, failureJson } = require('./views.js');
const { eventsQuery, areasQuery, eventDataQuery, addEventMutation, updateEventMutation, deleteEventMutation } = require('./queries.js');
const { authorizedUsers } = require('./authorizedUsers');

const web = new WebClient(process.env.SLACK_BOT_TOKEN);
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);
async function makeRequest(query, variables = {}, token = "") {
    headers = {
        "Content-Type": `application/json`,
        Accept: `application/json`
    }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    const res = await fetch(process.env.CMS_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    })

    return res;
}

// Slack will not display options data if text or value is greater than 75 characters so it must be shortened
String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? this.substr(0, n - 1) + '...' : this;
    };

String.prototype.capitalize = String.prototype.capitalize ||
    function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

const app = express();

app.use(morgan(function (tokens, req, res) {
    var status = tokens.status(req, res)
    var statusColor = status >= 500
        ? 'red' : status >= 400
            ? 'yellow' : status >= 300
                ? 'cyan' : 'green'

    return chalk.reset(tokens.method(req, res) + ' ' + tokens.url(req, res))
        + ' ' + chalk[statusColor](status)
        + ' ' + chalk.reset(tokens['response-time'](req, res) + ' ms')
}))


app.use('/slack/events', slackEvents.requestListener())

slackEvents.on('message', (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
})

slackEvents.on('app_home_opened', async (event) => {
    console.log("Setting home");
    console.log(process.env.SLACK_BOT_TOKEN)
    if (authorizedUsers.map(user => user.id).includes(event.user)) {
        console.log('authorized')
        const res = await web.views.publish(homeJson(event.user));
    } else {
        console.log('nah')
        const res = await web.views.publish(unauthorizedHomeJson(event.user));
    }
})

slackEvents.on('error', console.error);

app.use('/slack/actions', slackInteractions.requestListener());

slackInteractions.action({ actionId: 'open_modal' }, async (payload) => {
    console.log('Opening modal');

    const res = await web.views.open(modalJson(payload.trigger_id, payload.actions[0].value));
})

slackInteractions.viewSubmission('edit_modal_callback_id', async (payload) => {
    console.log('Edit modal submitted');

    let parsedData = parseData(payload.view.state.values);
    parsedData.event.where = {
        "id": payload.view.private_metadata
    }

    const res = await makeRequest(updateEventMutation(), parsedData, process.env.CMS_TOKEN);
    if (res.status == 200) {
        console.log("Event successfully edited");
        return successJson();
    } else {
        console.error("Event could not be updated, ", res.statusTest);
        return failureJson(res.statusText);
    }
})

slackInteractions.viewSubmission('create_modal_callback_id', async (payload) => {
    console.log('Create modal submitted');

    let parsedData = parseData(payload.view.state.values);
    parsedData.event.data.public = true;

    const res = await makeRequest(addEventMutation(), parsedData, process.env.CMS_TOKEN);
    if (res.status == 200) {
        console.log("Event successfully created");
        return successJson();
    } else {
        console.error("Event could not be created, ", res.statusTest);
        return failureJson(res.statusText);
    }
})

slackInteractions.viewSubmission('delete_modal_callback_id', async (payload) => {
    console.log('Delete modal submitted');

    let parsedData = {
        "event": {
            "where": {
                "id": payload.view.state.values.event.eventSelect.selected_option.value
            }
        }
    }

    const res = await makeRequest(deleteEventMutation(), parsedData, process.env.CMS_TOKEN)
    if (res.status == 200) {
        console.log("Event successfully deleted");
        return successJson();
    } else {
        console.error("Event could not be deleted, ", res.statusTest);
        return failureJson(res.statusText);
    }
})

function parseData(data) {
    try {
        let parsed = {
            "event": {
                "data": {
                    "title": data.title.titleInput.value,
                    "description": data.description.descriptionInput.value || '',
                    "start_time": data.startDate.startDatePicker.selected_date + " " + data.startTime.startTimeSelect.selected_option.value,
                    "end_time": data.endDate.endDatePicker.selected_date + " " + data.endTime.endTimeSelect.selected_option.value,
                    "area": data.area.areaSelect.selected_option.value,
                    "type": data.type.typeSelect.selected_option.value
                }
            }
        }
        return parsed;
    } catch (error) {
        console.error(error);
    }
}

slackInteractions.action({ actionId: 'eventSelect' }, async (payload) => {
    console.log('Event selected; Updating modal');

    let selected_event = payload.actions[0].selected_option;
    let data = await getEventData(selected_event.value);

    data.startDate = new Date(data.start_time);
    data.endDate = new Date(data.end_time);

    const res = await web.views.update(secondEditEventJson(payload.view.id, selected_event, data));
})

slackInteractions.action({ within: 'block_actions' }, (payload) => {
    console.log("Default block action called");
})

slackInteractions.options({ actionId: 'eventSelect' }, (payload) => {
    console.log('Getting events');

    return getEvents(payload.value).catch(console.error);
});

slackInteractions.options({ actionId: "areaSelect" }, (payload) => {
    console.log('Getting areas');

    return getAreas().catch(console.error);
})

async function getEventData(id) {
    const res = await makeRequest(eventDataQuery(id))

    let data = await res.json();
    data = data.data.eventbases;

    if (data.length == 1) {
        console.log(data[0]);
        return data[0];
    } else {
        console.log("Error retrieving data for event id: " + id);
    }
}

async function getAreas() {
    const res = await makeRequest(areasQuery());

    console.log("Fetched areas data");

    let data = await res.json();

    if (data.errors) {
        console.error(data.errors);
        return [];
    } else if (!data.data.areas) {
        return [];
    }

    data = data.data.areas;

    let options = {
        "options": []
    };

    for (area of data) {
        options.options.push({
            text: {
                type: "plain_text",
                text: area.name
            },
            value: area.id
        })
    }
    return options;
}

async function getEvents(query) {
    const res = await makeRequest(eventsQuery());

    console.log("Fetched event data");

    let data = await res.json();

    if (data.errors) {
        console.error(data.errors);
        return [];
    } else if (!data.data.eventbases) {
        return [];
    }

    data = data.data.eventbases;

    // Filters events based on what the user types in the dropdown box
    data = data.filter((event) => {
        if (!event.id || !event.title || !event.start_time) {
            return false;
        }
        return event.title.toLowerCase().replace(/\s/g, '').includes(query.toLowerCase().replace(/\s/g, ''));
    });

    for (i = 0; i < data.length; i++) {
        data[i].date = new Date(data[i].start_time);
    }

    data = data.sort((a, b) => a.date - b.date);

    let options = {
        "option_groups": []
    };

    let dates = [];

    for (event of data) {
        let timeString = dateformat(event.date, 'UTC:hh:MM TT');
        let dateString = dateformat(event.date, 'UTC:ddd, mmm dd, yyyy');

        if (!(dates.includes(dateString))) {
            options.option_groups.push({
                label: {
                    type: "plain_text",
                    text: dateString
                },
                options: []
            })

            dates.push(dateString);
        }

        let object = {
            text: {
                type: "plain_text",
                text: (timeString + " " + event.title).trunc(60)
            },
            value: event.id
        }

        options.option_groups[options.option_groups.length - 1].options.push(object);
    }

    return options;
}

app.use(express.urlencoded({ extended: true }));

app.post('/slack/slashcommand', (req, res) => {

    if (authorizedUsers.map(user => user.id).includes(req.body.user_id)) {
        res.json({ "blocks": homeJsonBlocks() });
    } else {
        res.json({ "blocks": unauthorizedHomeJsonBlocks() });
    }
})

app.get('/*', (req, res) => {
    res.send("Default get");
    console.log('Loading get');
})

app.post('/*', (req, res) => {
    res.send("Default post");
    console.log('Loading post');
})

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port ' + process.env.PORT || 3000);
})
