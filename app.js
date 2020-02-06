require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages');

const express = require('express');
const app = express();

const web = new WebClient(process.env.SLACK_BOT_TOKEN);
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);

const currentTime = new Date().toTimeString();

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

slackInteractions.action({ type: 'static_select' }, (payload, respond) => {
    console.log('static select');
    //console.log('payload', payload);
});

slackInteractions.action({ actionId: 'button-identifier', type: 'button' }, (payload) => {
    console.log('button');
})

slackInteractions.action({ type: 'external_select' }, (payload) => {
    console.log('external select');
})

slackInteractions.action({ within: 'block_actions' }, (payload) => {
    console.log(payload);
    console.log("Block action called")
    openModal(payload.trigger_id);
})

// Example of handling options request within block elements
slackInteractions.options({ within: 'block_actions' }, (payload) => {
    // Return a list of options to be shown to the user
    console.log('block actions yuh');
    return {
        options: [
            {
                text: {
                    type: 'plain_text',
                    text: 'A good choice',
                },
                value: 'good_choice',
            },
        ],
    };
});

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
                            "action_id": 'get_events',
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

    console.log(res);
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
                            "value": "create_task"
                        }
                    ]
                },
                {
                    "type": "section",
                    "block_id": "section678233",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Pick an item from the dropdown list"
                    },
                    "accessory": {
                        "action_id": "text123423",
                        "type": "external_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select an item"
                        }
                    }
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