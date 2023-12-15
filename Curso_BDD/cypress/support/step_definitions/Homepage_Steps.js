import { Given, When } from "@badeball/cypress-cucumber-preprocessor";

const url = "https://www.webdriveruniversity.com/"

Given(`Que eu acesso a home da pagina WebdriverUniversity`, () => {
    cy.visit(url)
})

When (`Eu clico no botão 'Contact Us'`, () => {
    cy.get('#contact-us').invoke("removeAttr", "target").click()
})

When (`Eu clico no botão 'Login'`, () => {
    cy.get('#login-portal').invoke("removeAttr", "target").click()
})