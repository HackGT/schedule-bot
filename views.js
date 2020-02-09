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
                        "text": "*CMS Changes: What would you like to do?*"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": ":calendar: *Create event*\nCreate a new event"
                    },
                    "accessory": {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Create event",
                            "emoji": true
                        },
                        "style": "primary"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": ":pencil: *Edit event*\nEdit an existing event "
                    },
                    "accessory": {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Edit event",
                            "emoji": true
                        },
                        "style": "primary",
                        "action_id": "open_schedule_modal"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": ":x: *Delete event*\n Remove an event "
                    },
                    "accessory": {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Delete event",
                            "emoji": true
                        },
                        "style": "primary"
                    }
                }
            ]
        }
    }
}

const defaultCreateEventJson = (trigger_id) => {
    return {
        'trigger_id': trigger_id,
        'view': {
            "type": "modal",
            "callback_id": "schedule_modal_callback_id",
            'notify_on_close': true,
            "title": {
                "type": "plain_text",
                "text": "Create Event"
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
                        "text": "Create event"
                    }
                }
            ]
        }
    }
}

const defaultEditEventJson = (trigger_id) => {
    return {
        'trigger_id': trigger_id,
        'view': {
            "type": "modal",
            "callback_id": "schedule_modal_callback_id",
            'notify_on_close': true,
            "title": {
                "type": "plain_text",
                "text": "Edit Event"
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
                        "text": "*Choose an event to edit*"
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
                }
            ]
        }
    }
}

const defaultDeleteEventJson = (trigger_id) => {
    return {
        'trigger_id': trigger_id,
        'view': {
            "type": "modal",
            "callback_id": "schedule_modal_callback_id",
            'notify_on_close': true,
            "title": {
                "type": "plain_text",
                "text": "Delete Event"
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
                        "text": "*Choose an event to delete*"
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
                }
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
                    },
                    "optional": true
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
                        "text": "Start Time",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "element": {
                        "type": "static_select",
                        "initial_option": {
                            "text": {
                                "type": "plain_text",
                                "text": dateformat(data.startDate, 'UTC:h:MM TT'),
                                "emoji": true
                            },
                            "value": dateformat(data.startDate, 'UTC:h:MM TT')
                        },
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select start time",
                            "emoji": true
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:00 AM",
                                    "emoji": true
                                },
                                "value": "12:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:15 AM",
                                    "emoji": true
                                },
                                "value": "12:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:30 AM",
                                    "emoji": true
                                },
                                "value": "12:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:45 AM",
                                    "emoji": true
                                },
                                "value": "12:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:00 AM",
                                    "emoji": true
                                },
                                "value": "1:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:15 AM",
                                    "emoji": true
                                },
                                "value": "1:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:30 AM",
                                    "emoji": true
                                },
                                "value": "1:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:45 AM",
                                    "emoji": true
                                },
                                "value": "1:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:00 AM",
                                    "emoji": true
                                },
                                "value": "2:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:15 AM",
                                    "emoji": true
                                },
                                "value": "2:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:30 AM",
                                    "emoji": true
                                },
                                "value": "2:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:45 AM",
                                    "emoji": true
                                },
                                "value": "2:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:00 AM",
                                    "emoji": true
                                },
                                "value": "3:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:15 AM",
                                    "emoji": true
                                },
                                "value": "3:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:30 AM",
                                    "emoji": true
                                },
                                "value": "3:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:45 AM",
                                    "emoji": true
                                },
                                "value": "3:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:00 AM",
                                    "emoji": true
                                },
                                "value": "4:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:15 AM",
                                    "emoji": true
                                },
                                "value": "4:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:30 AM",
                                    "emoji": true
                                },
                                "value": "4:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:45 AM",
                                    "emoji": true
                                },
                                "value": "4:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:00 AM",
                                    "emoji": true
                                },
                                "value": "5:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:15 AM",
                                    "emoji": true
                                },
                                "value": "5:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:30 AM",
                                    "emoji": true
                                },
                                "value": "5:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:45 AM",
                                    "emoji": true
                                },
                                "value": "5:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:00 AM",
                                    "emoji": true
                                },
                                "value": "6:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:15 AM",
                                    "emoji": true
                                },
                                "value": "6:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:30 AM",
                                    "emoji": true
                                },
                                "value": "6:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:45 AM",
                                    "emoji": true
                                },
                                "value": "6:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:00 AM",
                                    "emoji": true
                                },
                                "value": "7:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:15 AM",
                                    "emoji": true
                                },
                                "value": "7:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:30 AM",
                                    "emoji": true
                                },
                                "value": "7:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:45 AM",
                                    "emoji": true
                                },
                                "value": "7:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:00 AM",
                                    "emoji": true
                                },
                                "value": "8:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:15 AM",
                                    "emoji": true
                                },
                                "value": "8:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:30 AM",
                                    "emoji": true
                                },
                                "value": "8:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:45 AM",
                                    "emoji": true
                                },
                                "value": "8:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:00 AM",
                                    "emoji": true
                                },
                                "value": "9:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:15 AM",
                                    "emoji": true
                                },
                                "value": "9:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:30 AM",
                                    "emoji": true
                                },
                                "value": "9:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:45 AM",
                                    "emoji": true
                                },
                                "value": "9:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:00 AM",
                                    "emoji": true
                                },
                                "value": "10:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:15 AM",
                                    "emoji": true
                                },
                                "value": "10:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:30 AM",
                                    "emoji": true
                                },
                                "value": "10:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:45 AM",
                                    "emoji": true
                                },
                                "value": "10:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:00 AM",
                                    "emoji": true
                                },
                                "value": "11:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:15 AM",
                                    "emoji": true
                                },
                                "value": "11:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:30 AM",
                                    "emoji": true
                                },
                                "value": "11:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:45 AM",
                                    "emoji": true
                                },
                                "value": "11:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:00 PM",
                                    "emoji": true
                                },
                                "value": "12:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:15 PM",
                                    "emoji": true
                                },
                                "value": "12:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:30 PM",
                                    "emoji": true
                                },
                                "value": "12:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:45 PM",
                                    "emoji": true
                                },
                                "value": "12:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:00 PM",
                                    "emoji": true
                                },
                                "value": "1:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:15 PM",
                                    "emoji": true
                                },
                                "value": "1:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:30 PM",
                                    "emoji": true
                                },
                                "value": "1:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:45 PM",
                                    "emoji": true
                                },
                                "value": "1:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:00 PM",
                                    "emoji": true
                                },
                                "value": "2:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:15 PM",
                                    "emoji": true
                                },
                                "value": "2:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:30 PM",
                                    "emoji": true
                                },
                                "value": "2:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:45 PM",
                                    "emoji": true
                                },
                                "value": "2:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:00 PM",
                                    "emoji": true
                                },
                                "value": "3:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:15 PM",
                                    "emoji": true
                                },
                                "value": "3:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:30 PM",
                                    "emoji": true
                                },
                                "value": "3:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:45 PM",
                                    "emoji": true
                                },
                                "value": "3:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:00 PM",
                                    "emoji": true
                                },
                                "value": "4:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:15 PM",
                                    "emoji": true
                                },
                                "value": "4:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:30 PM",
                                    "emoji": true
                                },
                                "value": "4:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:45 PM",
                                    "emoji": true
                                },
                                "value": "4:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:00 PM",
                                    "emoji": true
                                },
                                "value": "5:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:15 PM",
                                    "emoji": true
                                },
                                "value": "5:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:30 PM",
                                    "emoji": true
                                },
                                "value": "5:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:45 PM",
                                    "emoji": true
                                },
                                "value": "5:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:00 PM",
                                    "emoji": true
                                },
                                "value": "6:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:15 PM",
                                    "emoji": true
                                },
                                "value": "6:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:30 PM",
                                    "emoji": true
                                },
                                "value": "6:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:45 PM",
                                    "emoji": true
                                },
                                "value": "6:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:00 PM",
                                    "emoji": true
                                },
                                "value": "7:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:15 PM",
                                    "emoji": true
                                },
                                "value": "7:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:30 PM",
                                    "emoji": true
                                },
                                "value": "7:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:45 PM",
                                    "emoji": true
                                },
                                "value": "7:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:00 PM",
                                    "emoji": true
                                },
                                "value": "8:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:15 PM",
                                    "emoji": true
                                },
                                "value": "8:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:30 PM",
                                    "emoji": true
                                },
                                "value": "8:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:45 PM",
                                    "emoji": true
                                },
                                "value": "8:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:00 PM",
                                    "emoji": true
                                },
                                "value": "9:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:15 PM",
                                    "emoji": true
                                },
                                "value": "9:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:30 PM",
                                    "emoji": true
                                },
                                "value": "9:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:45 PM",
                                    "emoji": true
                                },
                                "value": "9:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:00 PM",
                                    "emoji": true
                                },
                                "value": "10:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:15 PM",
                                    "emoji": true
                                },
                                "value": "10:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:30 PM",
                                    "emoji": true
                                },
                                "value": "10:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:45 PM",
                                    "emoji": true
                                },
                                "value": "10:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:00 PM",
                                    "emoji": true
                                },
                                "value": "11:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:15 PM",
                                    "emoji": true
                                },
                                "value": "11:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:30 PM",
                                    "emoji": true
                                },
                                "value": "11:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:45 PM",
                                    "emoji": true
                                },
                                "value": "11:45 PM"
                            },
                        ]
                    },
                    "label": {
                        "type": "plain_text",
                        "text": " ",
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
                        "initial_date": dateformat(data.endDate, 'UTC:yyyy-mm-dd'),
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select end date",
                            "emoji": true
                        }
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "End Time",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "element": {
                        "type": "static_select",
                        "initial_option": {
                            "text": {
                                "type": "plain_text",
                                "text": dateformat(data.endDate, 'UTC:h:MM TT'),
                                "emoji": true
                            },
                            "value": dateformat(data.endDate, 'UTC:h:MM TT')
                        },
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select end time",
                            "emoji": true
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:00 AM",
                                    "emoji": true
                                },
                                "value": "12:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:15 AM",
                                    "emoji": true
                                },
                                "value": "12:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:30 AM",
                                    "emoji": true
                                },
                                "value": "12:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:45 AM",
                                    "emoji": true
                                },
                                "value": "12:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:00 AM",
                                    "emoji": true
                                },
                                "value": "1:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:15 AM",
                                    "emoji": true
                                },
                                "value": "1:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:30 AM",
                                    "emoji": true
                                },
                                "value": "1:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:45 AM",
                                    "emoji": true
                                },
                                "value": "1:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:00 AM",
                                    "emoji": true
                                },
                                "value": "2:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:15 AM",
                                    "emoji": true
                                },
                                "value": "2:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:30 AM",
                                    "emoji": true
                                },
                                "value": "2:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:45 AM",
                                    "emoji": true
                                },
                                "value": "2:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:00 AM",
                                    "emoji": true
                                },
                                "value": "3:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:15 AM",
                                    "emoji": true
                                },
                                "value": "3:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:30 AM",
                                    "emoji": true
                                },
                                "value": "3:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:45 AM",
                                    "emoji": true
                                },
                                "value": "3:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:00 AM",
                                    "emoji": true
                                },
                                "value": "4:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:15 AM",
                                    "emoji": true
                                },
                                "value": "4:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:30 AM",
                                    "emoji": true
                                },
                                "value": "4:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:45 AM",
                                    "emoji": true
                                },
                                "value": "4:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:00 AM",
                                    "emoji": true
                                },
                                "value": "5:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:15 AM",
                                    "emoji": true
                                },
                                "value": "5:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:30 AM",
                                    "emoji": true
                                },
                                "value": "5:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:45 AM",
                                    "emoji": true
                                },
                                "value": "5:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:00 AM",
                                    "emoji": true
                                },
                                "value": "6:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:15 AM",
                                    "emoji": true
                                },
                                "value": "6:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:30 AM",
                                    "emoji": true
                                },
                                "value": "6:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:45 AM",
                                    "emoji": true
                                },
                                "value": "6:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:00 AM",
                                    "emoji": true
                                },
                                "value": "7:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:15 AM",
                                    "emoji": true
                                },
                                "value": "7:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:30 AM",
                                    "emoji": true
                                },
                                "value": "7:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:45 AM",
                                    "emoji": true
                                },
                                "value": "7:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:00 AM",
                                    "emoji": true
                                },
                                "value": "8:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:15 AM",
                                    "emoji": true
                                },
                                "value": "8:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:30 AM",
                                    "emoji": true
                                },
                                "value": "8:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:45 AM",
                                    "emoji": true
                                },
                                "value": "8:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:00 AM",
                                    "emoji": true
                                },
                                "value": "9:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:15 AM",
                                    "emoji": true
                                },
                                "value": "9:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:30 AM",
                                    "emoji": true
                                },
                                "value": "9:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:45 AM",
                                    "emoji": true
                                },
                                "value": "9:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:00 AM",
                                    "emoji": true
                                },
                                "value": "10:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:15 AM",
                                    "emoji": true
                                },
                                "value": "10:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:30 AM",
                                    "emoji": true
                                },
                                "value": "10:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:45 AM",
                                    "emoji": true
                                },
                                "value": "10:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:00 AM",
                                    "emoji": true
                                },
                                "value": "11:00 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:15 AM",
                                    "emoji": true
                                },
                                "value": "11:15 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:30 AM",
                                    "emoji": true
                                },
                                "value": "11:30 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:45 AM",
                                    "emoji": true
                                },
                                "value": "11:45 AM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:00 PM",
                                    "emoji": true
                                },
                                "value": "12:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:15 PM",
                                    "emoji": true
                                },
                                "value": "12:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:30 PM",
                                    "emoji": true
                                },
                                "value": "12:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12:45 PM",
                                    "emoji": true
                                },
                                "value": "12:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:00 PM",
                                    "emoji": true
                                },
                                "value": "1:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:15 PM",
                                    "emoji": true
                                },
                                "value": "1:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:30 PM",
                                    "emoji": true
                                },
                                "value": "1:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1:45 PM",
                                    "emoji": true
                                },
                                "value": "1:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:00 PM",
                                    "emoji": true
                                },
                                "value": "2:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:15 PM",
                                    "emoji": true
                                },
                                "value": "2:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:30 PM",
                                    "emoji": true
                                },
                                "value": "2:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2:45 PM",
                                    "emoji": true
                                },
                                "value": "2:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:00 PM",
                                    "emoji": true
                                },
                                "value": "3:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:15 PM",
                                    "emoji": true
                                },
                                "value": "3:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:30 PM",
                                    "emoji": true
                                },
                                "value": "3:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3:45 PM",
                                    "emoji": true
                                },
                                "value": "3:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:00 PM",
                                    "emoji": true
                                },
                                "value": "4:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:15 PM",
                                    "emoji": true
                                },
                                "value": "4:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:30 PM",
                                    "emoji": true
                                },
                                "value": "4:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4:45 PM",
                                    "emoji": true
                                },
                                "value": "4:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:00 PM",
                                    "emoji": true
                                },
                                "value": "5:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:15 PM",
                                    "emoji": true
                                },
                                "value": "5:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:30 PM",
                                    "emoji": true
                                },
                                "value": "5:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5:45 PM",
                                    "emoji": true
                                },
                                "value": "5:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:00 PM",
                                    "emoji": true
                                },
                                "value": "6:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:15 PM",
                                    "emoji": true
                                },
                                "value": "6:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:30 PM",
                                    "emoji": true
                                },
                                "value": "6:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6:45 PM",
                                    "emoji": true
                                },
                                "value": "6:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:00 PM",
                                    "emoji": true
                                },
                                "value": "7:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:15 PM",
                                    "emoji": true
                                },
                                "value": "7:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:30 PM",
                                    "emoji": true
                                },
                                "value": "7:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7:45 PM",
                                    "emoji": true
                                },
                                "value": "7:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:00 PM",
                                    "emoji": true
                                },
                                "value": "8:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:15 PM",
                                    "emoji": true
                                },
                                "value": "8:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:30 PM",
                                    "emoji": true
                                },
                                "value": "8:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8:45 PM",
                                    "emoji": true
                                },
                                "value": "8:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:00 PM",
                                    "emoji": true
                                },
                                "value": "9:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:15 PM",
                                    "emoji": true
                                },
                                "value": "9:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:30 PM",
                                    "emoji": true
                                },
                                "value": "9:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9:45 PM",
                                    "emoji": true
                                },
                                "value": "9:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:00 PM",
                                    "emoji": true
                                },
                                "value": "10:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:15 PM",
                                    "emoji": true
                                },
                                "value": "10:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:30 PM",
                                    "emoji": true
                                },
                                "value": "10:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10:45 PM",
                                    "emoji": true
                                },
                                "value": "10:45 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:00 PM",
                                    "emoji": true
                                },
                                "value": "11:00 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:15 PM",
                                    "emoji": true
                                },
                                "value": "11:15 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:30 PM",
                                    "emoji": true
                                },
                                "value": "11:30 PM"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11:45 PM",
                                    "emoji": true
                                },
                                "value": "11:45 PM"
                            },
                        ]
                    },
                    "label": {
                        "type": "plain_text",
                        "text": " ",
                        "emoji": true
                    }
                },
            ]
        }
    }
}

module.exports = {
    homeJson,
    defaultCreateEventJson,
    defaultEditEventJson,
    defaultDeleteEventJson,
    updateJson
}