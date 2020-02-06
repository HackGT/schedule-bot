require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
const fetch = require('node-fetch');

const express = require('express');
const app = express();

const web = new WebClient(process.env.SLACK_BOT_TOKEN);
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);

const currentTime = new Date().toTimeString();

// Slack will not display options data if text or value is greater than 75 characters so it must be shortened
String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? this.substr(0, n - 1) + '&hellip;' : this;
    };

app.use('/slack/events', slackEvents.requestListener())

slackEvents.on('message', (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
})

slackEvents.on('app_home_opened', (event) => {
    console.log("Setting home");
    setHome();
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

slackInteractions.options({ actionId: 'event_select' }, async (payload) => {
    console.log('Getting events');

    const data = await getEventData();
    console.log("Returning");

    console.log(data);
    // return {
    //     "options": [
    //         {
    //             "text": {
    //                 "type": "plain_text",
    //                 "text": "*this is plain_text text*"
    //             },
    //             "value": "value-0"
    //         },
    //     ]
    // }

    return data;
});

const getEventsQuery = `
	eventbases(start: 0) {
		title
		points
		start_time
		end_time
		checkin_slug
		area {
			name
		}
		type
	}
`;

async function getEventData() {
    const res = await fetch("https://cms.hack.gt/graphql", {
        method: "POST",
        headers: {
            "Content-Type": `application/json`,
            Accept: `application/json`
        },
        body: JSON.stringify({
            query: `query {
				${getEventsQuery}
			}`
        })
    })

    console.log("Fetched event data");

    let data = await res.json();
    data = data.data.eventbases;

    let options = {
        "options": []
    };

    for (event of data) {
        let strippedName = event.title.trim().replace(/[^A-Z0-9]+/ig, "_").trunc(40);
        let date = new Date(event.start_time)
        let dateString = date.getUTCHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0');

        let object = {
            text: {
                type: "plain_text",
                text: (dateString + " " + event.title).trunc(40)
            },
            value: strippedName
        }

        options.options.push(object);
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
    console.log(selected_event);
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
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Choose an updated date and time*"
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

async function setHome() {
    const res = await web.views.publish({
        'user_id': 'US8UHEKPB',
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