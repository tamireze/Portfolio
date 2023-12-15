import { Then,  When } from "@badeball/cypress-cucumber-preprocessor"

let stub

When(`Eu digito um {string}`, (username) =>{
    cy.get('#text').type(username)
})

When(`Eu digito uma {string}`, (password) =>{
    cy.get('#password').type(password)
})

When(`Eu clico no botão de 'Login'`, () =>{
    stub = cy.stub()
    cy.on('window:alert', stub)
    cy.get('#login-button').click()
})

Then (`Eu devo visualizar uma mensagem de login {string}`, (message) =>{
    expect(stub).to.have.been.calledWith(message)
})
