/* eslint-disable @typescript-eslint/no-namespace */
import "./intercept-network"
import "./locators"

declare global {
    namespace Cypress {
        interface Chainable {
            mockAuth(): Chainable<void>
            waitForRefresh(): Chainable<void>
            dataTestId(id: string): Chainable<JQuery<HTMLElement>>
        }
    }
}

