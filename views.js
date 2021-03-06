const dateformat = require('dateformat');

const timeOptions = [
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

const homeJson = (user) => {
    return {
        "user_id": user,
        "view": {
            "type": "home",
            "blocks": homeJsonBlocks()
        }
    }
}

const homeJsonBlocks = () => {
    return [
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
                "text": ":calendar: *Create a new event*"
            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Create event",
                    "emoji": true
                },
                "style": "primary",
                "action_id": "open_modal",
                "value": "create"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ":pencil: *Edit an event*"
            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Edit event",
                    "emoji": true
                },
                "style": "primary",
                "action_id": "open_modal",
                "value": "edit"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ":x: *Delete an event*"
            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Delete event",
                    "emoji": true
                },
                "style": "primary",
                "action_id": "open_modal",
                "value": "delete"
            }
        }
    ]
}

const unauthorizedHomeJson = (user) => {
    return {
        "user_id": user,
        "view": {
            "type": "home",
            "blocks": unauthorizedHomeJsonBlocks()
        }
    }
}

const unauthorizedHomeJsonBlocks = () => {
    return [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Sorry, you do not have access to this page. Please contact a HackGT tech member for more information*"
            }
        }
    ]
}

const modalJson = (trigger_id, value) => {
    if (value == "create") {
        return firstCreateEventJson(trigger_id);
    } else if (value == "edit") {
        return firstEditEventJson(trigger_id);
    } else if (value == "delete") {
        return firstDeleteEventJson(trigger_id);
    }
}

const editHeaderJson = (selected_event = undefined) => {
    return [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*Choose an event to edit*`
            }
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "external_select",
                    "action_id": "eventSelect",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select event",
                        "emoji": true
                    },
                    "min_query_length": 0,
                    "initial_option": selected_event
                }
            ],
        }
    ]
}

const deleteHeaderJson = () => {
    return [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*Choose an event to delete*`
            }
        },
        {
            "type": "input",
            "block_id": "event",
            "element": {
                "type": "external_select",
                "action_id": "eventSelect",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select event",
                    "emoji": true
                },
                "min_query_length": 0,
            },
            "label": {
                "type": "plain_text",
                "text": " ",
                "emoji": true
            }
        }
    ]
}

const dividerJson = () => {
    return [
        {
            "type": "divider"
        }
    ]
}

// The data variable represents the initial value of the form
// If it is undefined, the form will have no initial values (ie. when creating an event)
const bodyJson = (data = undefined) => {
    return [
        {
            "type": "input",
            "block_id": "title",
            "element": {
                "type": "plain_text_input",
                "action_id": "titleInput",
                "initial_value": data ? data.title || '' : undefined,
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
            "block_id": "description",
            "element": {
                "type": "plain_text_input",
                "action_id": "descriptionInput",
                "multiline": true,
                "initial_value": data ? data.description || '' : undefined,
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
            "block_id": "startDate",
            "element": {
                "type": "datepicker",
                "action_id": "startDatePicker",
                "initial_date": data ? dateformat(data.startDate, 'UTC:yyyy-mm-dd') : undefined,
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
            "block_id": "startTime",
            "element": {
                "type": "static_select",
                "action_id": "startTimeSelect",
                "initial_option": data ? {
                    "text": {
                        "type": "plain_text",
                        "text": dateformat(data.startDate, 'UTC:h:MM TT'),
                        "emoji": true
                    },
                    "value": dateformat(data.startDate, 'UTC:h:MM TT')
                } : undefined,
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select start time",
                    "emoji": true
                },
                "options": timeOptions
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
            "block_id": "endDate",
            "element": {
                "type": "datepicker",
                "action_id": "endDatePicker",
                "initial_date": data ? dateformat(data.endDate, 'UTC:yyyy-mm-dd') : undefined,
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
            "block_id": "endTime",
            "element": {
                "type": "static_select",
                "action_id": "endTimeSelect",
                "initial_option": data ? {
                    "text": {
                        "type": "plain_text",
                        "text": dateformat(data.endDate, 'UTC:h:MM TT'),
                        "emoji": true
                    },
                    "value": dateformat(data.endDate, 'UTC:h:MM TT')
                } : undefined,
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select end time",
                    "emoji": true
                },
                "options": timeOptions
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
            "block_id": "area",
            "element": {
                "type": "external_select",
                "action_id": "areaSelect",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select event location",
                    "emoji": true
                },
                "initial_option": (data && data.area) ? {
                    "text": {
                        "type": "plain_text",
                        "text": data.area.name,
                        "emoji": true
                    },
                    "value": data.area.id
                } : undefined,
                "min_query_length": 0
            },
            "label": {
                "type": "plain_text",
                "text": "Location",
                "emoji": true
            },
        },
        {
            "type": "input",
            "block_id": "type",
            "element": {
                "type": "static_select",
                "action_id": "typeSelect",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select event type",
                    "emoji": true
                },
                "initial_option": (data && data.type) ? {
                    "text": {
                        "type": "plain_text",
                        "text": data.type.capitalize(),
                        "emoji": true
                    },
                    "value": data.type
                } : undefined,
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Workshop",
                            "emoji": true
                        },
                        "value": "workshop"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Talk",
                            "emoji": true
                        },
                        "value": "talk"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Minievent",
                            "emoji": true
                        },
                        "value": "minievent"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Meal",
                            "emoji": true
                        },
                        "value": "meal"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Other",
                            "emoji": true
                        },
                        "value": "other"
                    },
                ]
            },
            "label": {
                "type": "plain_text",
                "text": "Type",
                "emoji": true
            },
        }
    ]
}

const firstCreateEventJson = (trigger_id) => {
    return {
        "trigger_id": trigger_id,
        "view": {
            "type": "modal",
            "callback_id": "create_modal_callback_id",
            "notify_on_close": true,
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
            "blocks": bodyJson()
        }
    }
}

const firstEditEventJson = (trigger_id) => {
    return {
        "trigger_id": trigger_id,
        "view": {
            "type": "modal",
            'notify_on_close': true,
            "title": {
                "type": "plain_text",
                "text": "Edit Event"
            },
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "blocks": editHeaderJson()
        }
    }
}

const firstDeleteEventJson = (trigger_id) => {
    return {
        'trigger_id': trigger_id,
        'view': {
            "type": "modal",
            "callback_id": "delete_modal_callback_id",
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
            "blocks": deleteHeaderJson()
        }
    }
}

const secondEditEventJson = (modal_id, selected_event, data) => {
    return {
        "view_id": modal_id,
        "view": {
            "type": "modal",
            "callback_id": "edit_modal_callback_id",
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
            "private_metadata": selected_event.value,
            "blocks": editHeaderJson(selected_event).concat(dividerJson(), bodyJson(data))
        }
    }
}

const successJson = () => {
    return {
        "response_action": "update",
        "view": {
            "type": "modal",
            "title": {
                "type": "plain_text",
                "text": "CMS Success"
            },
            "close": {
                "type": "plain_text",
                "text": "Done",
                "emoji": true
            },
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Yay! CMS was successfully updated.*"
                    }
                }
            ]
        }
    }
}

const failureJson = (error) => {
    return {
        "response_action": "update",
        "view": {
            "type": "modal",
            "title": {
                "type": "plain_text",
                "text": "CMS Error"
            },
            "close": {
                "type": "plain_text",
                "text": "Done",
                "emoji": true
            },
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*:( There was an error updating CMS. Please contact a member of the tech team*"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Error: " + error
                    }
                }
            ]
        }
    }
}

module.exports = {
    homeJson,
    homeJsonBlocks,
    unauthorizedHomeJson,
    unauthorizedHomeJsonBlocks,
    modalJson,
    secondEditEventJson,
    successJson,
    failureJson
}