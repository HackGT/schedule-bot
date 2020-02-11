const eventsQuery = () => `
    query {
        eventbases(start: 0) {
            id
            title
            start_time
        }
    }
`;

const areasQuery = () => `
    query {
        areas(start: 0) {
            id
            name
        }
    }
`

const eventDataQuery = (id) => `
    query {
        eventbases(where: { _id: "${id}" }) {
            title
            description
            start_time
            end_time
            area {
                name
                id
            }
            type
        }
    }
`;

const addEventMutation = () => `
    mutation AddEvent($event: createEventbaseInput) {
      createEventbase(input: $event) {
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
    mutation UpdateEvent($event: updateEventbaseInput) {
      updateEventbase(input: $event) {
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
    mutation DeleteEvent($event: deleteEventbaseInput) {
      deleteEventbase(input: $event) {
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
  areasQuery,
  eventDataQuery,
  addEventMutation,
  updateEventMutation,
  deleteEventMutation
}
