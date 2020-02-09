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

module.exports = {
    eventsQuery,
    eventDataQuery
}