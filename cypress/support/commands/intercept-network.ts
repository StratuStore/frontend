Cypress.Commands.add("mockAuth", () => {
    cy.intercept("POST", "/refresh", {
        body: {
            ok: true,
            body: {
                accessToken: Cypress.env("mock_at"),
                refreshToken: Cypress.env("mock_rt"),
            },
        },
    }).as("refreshRequest")
})

Cypress.Commands.add("waitForRefresh", () => {
    cy.wait("@refreshRequest")
})
