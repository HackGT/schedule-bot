require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
const fetch = require('node-fetch');
const dateformat = require('dateformat');
const express = require('express');

const { secondEditEventJson, modalJson, homeJson } = require('./views.js');
const { eventsQuery, areasQuery, eventDataQuery, addEventMutation, updateEventMutation, deleteEventMutation } = require('./queries.js');

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

app.use('/slack/events', slackEvents.requestListener())

slackEvents.on('message', (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
})

slackEvents.on('app_home_opened', (event) => {
    console.log("Setting home");
    setHome(event.user);
})

slackEvents.on('error', console.error);

app.use('/slack/actions', slackInteractions.requestListener());

slackInteractions.viewClosed('schedule_modal_callback_id', (payload) => {
    console.log('View closed');
})

slackInteractions.viewSubmission('schedule_modal_callback_id', (payload) => {
    console.log('View submitted');

    let data = payload.view.state.values;
    let parsed = {
        "title": data.title.titleInput.value,
        "description": data.description.descriptionInput.value || '',
        "start_time": data.startDate.startDatePicker.selected_date + " " + data.startTime.startTimeSelect.selected_option.value,
        "end_time": data.endDate.endDatePicker.selected_date + " " + data.endTime.endTimeSelect.selected_option.value,
        "area": data.area.areaSelect.selected_option.value,
        "type": data.type.typeSelect.selected_option.value
    }


})

slackInteractions.action({ actionId: 'eventSelect' }, (payload) => {
    console.log('Event selected; Updating modal');

    updateModal(payload.view.id, payload.actions[0].selected_option);
})

slackInteractions.action({ actionId: 'open_modal' }, async (payload) => {
    console.log('Opening modal')

    const res = await web.views.open(modalJson(payload.trigger_id, payload.actions[0].value));
})

slackInteractions.action({ within: 'block_actions' }, (payload) => {
    console.log("Default block action called")
})

slackInteractions.options({ actionId: 'eventSelect' }, (payload) => {
    console.log('Getting events');

    return getEvents(payload.value);
});

slackInteractions.options({ actionId: "areaSelect" }, (payload) => {
    console.log('Getting areas');

    return getAreas();
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

async function addEventData(data) {
    const res = await makeRequest(addEventMutation(), data, process.env.token)
}

async function changeEventData(data) {
    const res = await makeRequest(updateEventMutation(), data, process.env.token)
}

async function deleteEventData(data) {
    const res = await makeRequest(deleteEventMutation(), data, process.env.token)
}

async function getAreas() {
    const res = await makeRequest(areasQuery());

    console.log("Fetched areas data");

    let data = await res.json();
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
    data = data.data.eventbases;

    // Filters events based on what the user types in the dropdown box
    data = data.filter((event) => {
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

async function updateModal(modal_id, selected_event) {

    data = await getEventData(selected_event.value);

    data.startDate = new Date(data.start_time);
    data.endDate = new Date(data.end_time);

    const res = await web.views.update(secondEditEventJson(modal_id, selected_event, data));
}

async function getUsers() {
    console.log("Getting users");
    const res = await web.users.list();
}

async function setHome(user) {
    const res = await web.views.publish(homeJson(user));
}

app.get('/*', (req, res) => {
    console.log('Loading get');
})

app.post('/*', (req, res) => {
    console.log('Loading post');
})

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port ' + process.env.PORT || 3000);
})
