// ***********************************************
// This example commands.ts file shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to select elements by data-cy attribute
Cypress.Commands.add('dataCy', (value: string) => {
  return cy.get(`[data-cy=${value}]`)
})

// Custom command to fill contact form
Cypress.Commands.add('fillContactForm', (name: string, email: string, message: string) => {
  cy.get('input[name="name"]').clear().type(name)
  cy.get('input[name="email"]').clear().type(email)
  cy.get('textarea[name="message"]').clear().type(message)
})
