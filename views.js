const dateformat = require('dateformat');

const homeJson = (user) => {
    return {
        "user_id": user,
        "view": {
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
                                "text": "Change Schedule",
                                "emoji": true
                            },
                            "style": "primary",
                            "action_id": "open_schedule_modal"
                        }
                    ]
                },
            ]
        }
    }
}

const modalJson = (trigger_id) => {
    return {
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
    }
}

const updateJson = (modal_id, selected_event, data) => {
    return {
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
                    "type": "divider"
                },
                {
                    "type": "input",
                    "element": {
                        "type": "plain_text_input",
                        "initial_value": data.title || '',
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Enter event title"
                        }
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Title",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "element": {
                        "type": "plain_text_input",
                        "multiline": true,
                        "initial_value": data.description || '',
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Enter event description"
                        }
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Description",
                        "emoji": true
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "input",
                    "element": {
                        "type": "datepicker",
                        "initial_date": dateformat(data.startDate, 'UTC:yyyy-mm-dd'),
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select start date",
                            "emoji": true
                        }
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Start Date",
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Start Time*"
                    },
                    "accessory": {
                        "type": "static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Hour",
                            "emoji": true
                        },
                        "initial_option": {
                            "text": {
                                "type": "plain_text",
                                "text": dateformat(data.startDate, 'UTC:h'),
                                "emoji": true
                            },
                            "value": "value-" + dateformat(data.startDate, 'UTC:h')
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12",
                                    "emoji": true
                                },
                                "value": "value-12"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1",
                                    "emoji": true
                                },
                                "value": "value-1"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2",
                                    "emoji": true
                                },
                                "value": "value-2"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3",
                                    "emoji": true
                                },
                                "value": "value-3"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4",
                                    "emoji": true
                                },
                                "value": "value-4"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5",
                                    "emoji": true
                                },
                                "value": "value-5"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6",
                                    "emoji": true
                                },
                                "value": "value-6"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7",
                                    "emoji": true
                                },
                                "value": "value-7"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8",
                                    "emoji": true
                                },
                                "value": "value-8"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9",
                                    "emoji": true
                                },
                                "value": "value-9"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10",
                                    "emoji": true
                                },
                                "value": "value-10"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11",
                                    "emoji": true
                                },
                                "value": "value-11"
                            }
                        ]
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": " "
                    },
                    "accessory": {
                        "type": "static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Minute",
                            "emoji": true
                        },
                        "initial_option": {
                            "text": {
                                "type": "plain_text",
                                "text": ":" + dateformat(data.startDate, 'UTC:MM'),
                                "emoji": true
                            },
                            "value": "value-" + dateformat(data.startDate, 'UTC:MM')
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":00",
                                    "emoji": true
                                },
                                "value": "value-00"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":15",
                                    "emoji": true
                                },
                                "value": "value-15"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":30",
                                    "emoji": true
                                },
                                "value": "value-30"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":45",
                                    "emoji": true
                                },
                                "value": "value-45"
                            },
                        ]
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": " "
                    },
                    "accessory": {
                        "type": "static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "AM/PM",
                            "emoji": true
                        },
                        "initial_option": {
                            "text": {
                                "type": "plain_text",
                                "text": dateformat(data.startDate, 'UTC:TT'),
                                "emoji": true
                            },
                            "value": "value-" + dateformat(data.startDate, 'UTC:TT')
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "AM",
                                    "emoji": true
                                },
                                "value": "value-AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "PM",
                                    "emoji": true
                                },
                                "value": "value-PM"
                            }
                        ]
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "input",
                    "element": {
                        "type": "datepicker",
                        "initial_date": dateformat(data.endDate, 'UTC:yyyy-mm-dd'),
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select end date",
                            "emoji": true
                        }
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "End Date",
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*End Time*"
                    },
                    "accessory": {
                        "type": "static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Hour",
                            "emoji": true
                        },
                        "initial_option": {
                            "text": {
                                "type": "plain_text",
                                "text": dateformat(data.endDate, 'UTC:h'),
                                "emoji": true
                            },
                            "value": "value-" + dateformat(data.endDate, 'UTC:h')
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12",
                                    "emoji": true
                                },
                                "value": "value-12"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1",
                                    "emoji": true
                                },
                                "value": "value-1"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2",
                                    "emoji": true
                                },
                                "value": "value-2"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3",
                                    "emoji": true
                                },
                                "value": "value-3"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4",
                                    "emoji": true
                                },
                                "value": "value-4"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5",
                                    "emoji": true
                                },
                                "value": "value-5"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6",
                                    "emoji": true
                                },
                                "value": "value-6"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7",
                                    "emoji": true
                                },
                                "value": "value-7"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8",
                                    "emoji": true
                                },
                                "value": "value-8"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9",
                                    "emoji": true
                                },
                                "value": "value-9"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10",
                                    "emoji": true
                                },
                                "value": "value-10"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11",
                                    "emoji": true
                                },
                                "value": "value-11"
                            }
                        ]
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": " "
                    },
                    "accessory": {
                        "type": "static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Minute",
                            "emoji": true
                        },
                        "initial_option": {
                            "text": {
                                "type": "plain_text",
                                "text": ":" + dateformat(data.endDate, 'UTC:MM'),
                                "emoji": true
                            },
                            "value": "value-" + dateformat(data.endDate, 'UTC:MM')
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":00",
                                    "emoji": true
                                },
                                "value": "value-00"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":15",
                                    "emoji": true
                                },
                                "value": "value-15"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":30",
                                    "emoji": true
                                },
                                "value": "value-30"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":45",
                                    "emoji": true
                                },
                                "value": "value-45"
                            },
                        ]
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": " "
                    },
                    "accessory": {
                        "type": "static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "AM/PM",
                            "emoji": true
                        },
                        "initial_option": {
                            "text": {
                                "type": "plain_text",
                                "text": dateformat(data.endDate, 'UTC:TT'),
                                "emoji": true
                            },
                            "value": "value-" + dateformat(data.endDate, 'UTC:TT')
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "AM",
                                    "emoji": true
                                },
                                "value": "value-AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "PM",
                                    "emoji": true
                                },
                                "value": "value-PM"
                            }
                        ]
                    }
                },
            ]
        }
    }
}

module.exports = {
    homeJson,
    modalJson,
    updateJson
}