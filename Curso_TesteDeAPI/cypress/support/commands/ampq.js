Cypress.Commands.add('purgeMessageQueue', () => {
    cy.api({
        url: Cypress.env('amqpHost') + 'tasks/contents',
        method: 'DELETE',
        body: {
            mode: 'purge',
            name: Cypress.env('amqpQueue'),
            vhost: 'sgunlvca'
        },
        headers: {
            authorization: Cypress.env('amqpToken')
        },
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('getMessageQueue', () => {
    cy.api({
        url: Cypress.env('amqpHost') + 'tasks/get',
        method: 'POST',
        body: {
            vhost: 'sgunlvca',
            name: Cypress.env('amqpQueue'),
            truncatev: '50000',
            ackmode: 'ack_requeue_true',
            encoding: 'auto',
            count: '1'
        },
        headers: {
            authorization: Cypress.env('amqpToken')
        },
        failOnStatusCode: false
    }).then(response => { return response })
})