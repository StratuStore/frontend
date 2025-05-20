import { TestPopover } from "./Popover.test"

describe("Popover", () => {
    it("should render trigger button", () => {
        cy.mount(<TestPopover />)
        cy.get('[data-testid="trigger"]').should("be.visible")
    })

    it("should show content when trigger is clicked", () => {
        cy.mount(<TestPopover />)
        cy.get('[data-testid="trigger"]').click()
        cy.get('[data-testid="content"]').should("be.visible")
    })

    it("should close content when clicking outside", () => {
        cy.mount(
            <>
                <TestPopover />
                <button data-testid="outside">Outside</button>
            </>
        )
        cy.get('[data-testid="trigger"]').click()
        cy.get('[data-testid="content"]').should("be.visible")
        cy.get('[data-testid="outside"]').click()
        cy.get('[data-testid="content"]').should("not.exist")
    })

    it("should close content when pressing Escape", () => {
        cy.mount(<TestPopover />)
        cy.get('[data-testid="trigger"]').click()
        cy.get('[data-testid="content"]').should("be.visible")
        cy.get("body").type("{esc}")
        cy.get('[data-testid="content"]').should("not.exist")
    })

    it("should keep content open when clicking inside content", () => {
        cy.mount(<TestPopover />)
        cy.get('[data-testid="trigger"]').click()
        cy.get('[data-testid="content"]').should("be.visible")
        cy.get('[data-testid="content"]').click()
        cy.get('[data-testid="content"]').should("be.visible")
    })
})

