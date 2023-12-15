import { Then,  When } from "@badeball/cypress-cucumber-preprocessor"


//Submissão de formulário válida
When(`Eu digito no campo 'First Name'`, () =>{
    cy.get('[name="first_name"]').type('Tamires')
})

When(`Eu digito no campo 'Last Name'`, () =>{
    cy.get('[name="last_name"]').type('Oliveira')
})

When(`Eu digito no campo 'Email'`, () =>{
    cy.get('[name="email"]').type('tamires@gmail.com')
})

When(`Eu adiciono um comentário`, () =>{
    cy.get('[name="message"]').type('Comentariooos')
})

When(`Eu clico no botão de Submissão`, () =>{
    cy.get('[type="submit"]').click()
})

Then(`Eu devo visualizar uma mensagem de sucesso`, () =>{
    cy.get('h1').should('have.text','Thank You for your Message!')
})

//Submissão de formuláio inváldia - Sem um campo

Then (`Eu devo visualizar a mensagem 'Error: all fields are required'`, () =>{
    cy.get('body').contains('Error: all fields are required')
})

//Submissão de formuláio inváldia - Email inválido

When(`Eu digito no campo 'Email' um email inválido`, () =>{
    cy.get('[name="email"]').type('tamireseee')
})

Then (`Eu devo visualizar a mensagem 'Error: Invalid email address'`, () =>{
    cy.get('body').contains('Error: Invalid email address')
})
//Submissão de formulário válida - Usando dados especificos

When(`Eu digito um especifico first name {string}`, (firstName) =>{
    cy.get('[name="first_name"]').type(firstName)
})

When(`Eu digito um especifico last name {string}`, (lastName) =>{
    cy.get('[name="last_name"]').type(lastName)
})

When(`Eu digito um especifico email adress {string}`, (email) =>{
    cy.get('[name="email"]').type(email)
})

When(`Eu digito um especifico comments {string} and um número {int}`, (word, number) =>{
    cy.get('[name="message"]').type(word + " " + number)
})

//Subimissão de formulário válida - Usando Outline

When (`Eu digito no campo {string} e digito no campo {string}`, (firstName, lastName) => {
    cy.get('[name="first_name"]').type(firstName)
    cy.get('[name="last_name"]').type(lastName)
})


When (`Eu digito no campo {string} e comento {string}`, (email, comment) => {
    cy.get('[name="email"]').type(email)
    cy.get('[name="message"]').type(comment)
})

Then('Eu devo visualizar uma mensagem com {string}', (message) => {

    cy.xpath("//h1 | //body").contains(message);

  });

