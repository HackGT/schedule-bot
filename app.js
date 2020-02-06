require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
const fetch = require('node-fetch');
const dateformat = require('dateformat');


const express = require('express');
const app = express();

const web = new WebClient(process.env.SLACK_BOT_TOKEN);
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);

const currentTime = new Date().toTimeString();

// Slack will not display options data if text or value is greater than 75 characters so it must be shortened
String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? this.substr(0, n - 1) + '...' : this;
    };

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
})

slackInteractions.action({ actionId: 'event_select' }, (payload) => {
    console.log('Event selected; Updating modal');

    updateModal(payload.view.id, payload.actions[0].selected_option);
})

slackInteractions.action({ actionId: 'open_schedule_modal' }, (payload) => {
    console.log('Opening modal')

    openModal(payload.trigger_id);
})

slackInteractions.action({ within: 'block_actions' }, (payload) => {
    console.log("Default block action called")
})

slackInteractions.options({ actionId: 'event_select' }, (payload) => {
    console.log('Getting events');

    return getEventData(payload.value);
});

async function getEventData(id) {
    const res = await fetch("https://cms.hack.gt/graphql", {
        method: "POST",
        headers: {
            "Content-Type": `application/json`,
            Accept: `application/json`
        },
        body: JSON.stringify({
            query: eventDataQuery()
        })
    })
}

async function getEventData(query) {
    const res = await fetch("https://cms.hack.gt/graphql", {
        method: "POST",
        headers: {
            "Content-Type": `application/json`,
            Accept: `application/json`
        },
        body: JSON.stringify({
            query: eventsQuery()
        })
    })

    console.log("Fetched event data");

    let data = await res.json();
    data = data.data.eventbases;

    console.log(data);

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
        let identifier = (event.title + event.area.name).trim().replace(/[^A-Z0-9]+/ig, "_").trunc(60);
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
            value: identifier
        }

        options.option_groups[options.option_groups.length - 1].options.push(object);
    }

    return options;
}

async function openModal(trigger_id) {
    const res = await web.views.open({
        'trigger_id': trigger_id,
        'view': {
            "type": "modal",
            "callback_id": "schedule_modal_callback_id",
            'notify_on_close': true,
            "title": {
                "type": "plain_text",
                "text": "Update Schedule"
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Choose an event to update*"
                    }
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "external_select",
                            "action_id": 'event_select',
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select event",
                                "emoji": true
                            },
                            "min_query_length": 0
                        }
                    ],
                },

            ]
        }
    })
}

async function updateModal(modal_id, selected_event) {
    const res = await web.views.update({
        "view_id": modal_id,
        "view": {
            "type": "modal",
            "callback_id": "schedule_modal_callback_id",
            'notify_on_close': true,
            "title": {
                "type": "plain_text",
                "text": "Update Schedule"
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Choose an event to update*"
                    }
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "external_select",
                            "action_id": 'event_select',
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select event",
                                "emoji": true
                            },
                            "min_query_length": 0,
                            "initial_option": selected_event
                        }
                    ],
                },
                {
                    "type": "input",
                    "element": {
                        "type": "plain_text_input"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Title",
                        "emoji": true
                    }
                },
            ]
        }
    })
}


app.get('/*', (req, res) => {
    console.log('Loading get');
})

app.post('/*', (req, res) => {
    console.log(req);
    console.log('Loading post');
})

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port ' + process.env.PORT || 3000);
})


// interface ChatPostMessageResult extends WebAPICallResult {
//     channel: string;
//     ts: string;
//     message: {
//         text: string;
//     }
// }

// (async () => {
//     try {
//         const res = await web.chat.postMessage({
//             channel: 'schedule-bot-test',
//             text: `The current time is ${currentTime}`
//         }) as ChatPostMessageResult;

//         console.log(`A message was posed to conversation ${res.channel} with id ${res.ts} which contains the message ${res.message.text}`)
//     } catch (error) {
//         console.log(error);
//     }
// })();

async function getUsers() {
    const res = await web.users.list();
    console.log("hello")
    console.log(res);
}

async function setHome(user) {
    const res = await web.views.publish({
        'user_id': user,
        'view': {
            "type": "home",
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Welcome to Schedule Changer!*"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Update Schedule",
                                "emoji": true
                            },
                            "style": "primary",
                            "action_id": "open_schedule_modal"
                        }
                    ]
                },
            ]
        }
    })

    //console.log(res);
}


// QUERIES

const eventsQuery = () => `
    query {
        eventbases(start: 0) {
            id
            title
            start_time
            area {
                name
            }
        }
    }
`;

const eventDataQuery = () => `
    query {
        eventbases(id: ${id}) {
            title
            description
            start_time
            end_time
            area {
                name
            }
            type
        }
    }
`;

//setHome();


// (async () => {

//     const res = await web.users.identity();
//     console.log(res);

//     // Open a modal.
//     // Find more arguments and details of the response: https://api.slack.com/methods/views.open
//     const result = await web.views.publish({
//         user_id: "Ayush Goyal",
//         view: {
//             type: 'modal',
//             callback_id: 'view_identifier',
//             title: {
//                 type: 'plain_text',
//                 text: 'Modal title'
//             },
//             submit: {
//                 type: 'plain_text',
//                 text: 'Submit'
//             },
//             blocks: [
//                 {
//                     type: 'input',
//                     label: {
//                         type: 'plain_text',
//                         text: 'Input label'
//                     },
//                     element: {
//                         type: 'plain_text_input',
//                         action_id: 'value_indentifier'
//                     }
//                 }
//             ]
//         }
//     });

//     // The result contains an identifier for the root view, view.id
//     console.log(`Successfully opened root view ${result.view.id}`);
// })();