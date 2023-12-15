Cypress.Commands.add('search', novoTermo=> {
    cy.get('input[type="text"]')
      .should('be.visible')
      .clear()
      .type(`${novoTermo}{enter}`)
  })