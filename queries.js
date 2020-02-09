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

const eventDataQuery = (id) => `
    query {
        eventbases(where: { _id: "${id}" }) {
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

const addEventMutation = () => `
    mutation AddEvent($createEvent: createEventbaseInput) {
      createEventbase(input: $createEvent) {
        eventbase {
          title
          start_time
          end_time
          id
        }
      }
    }
`

const updateEventMutation = () => `
    mutation UpdateEvent($updateEvent: updateEventbaseInput) {
      updateEventbase(input: $updateEvent) {
        eventbase {
          title
          start_time
          end_time
          id
        }
      }
    }
`
const deleteEventMutation = () => `
    mutation DeleteEvent($deleteEvent: deleteEventbaseInput) {
      deleteEventbase(input: $deleteEvent) {
        eventbase {
          title
          start_time
          end_time
          id
        }
      }
    }
`

module.exports = {
    eventsQuery,
    eventDataQuery,
    addEventMutation,
    updateEventMutation,
    deleteEventMutation
}
