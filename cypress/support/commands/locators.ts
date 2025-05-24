Cypress.Commands.add("dataTestId", (id) => {
    return cy.get(`[data-testid="${id}"]`)
})

