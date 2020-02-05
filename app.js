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
    if (event.tab == 'home' && event.user == 'US8UHEKPB') {
        console.log("Setting home");
        setHome();
    }
})

slackEvents.on('error', console.error);

app.use('/slack/actions', slackInteractions.requestListener());



app.get('/*', (req, res) => {
    console.log('Loading get');
})

app.post('/*', (event) => {
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
                        "text": "A simple stack of blocks for the simple sample Block Kit Home tab."
                    }
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Action A",
                                "emoji": true
                            }
                        },
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Action B",
                                "emoji": true
                            }
                        }
                    ]
                }
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