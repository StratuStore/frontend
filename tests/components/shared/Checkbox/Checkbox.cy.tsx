import { Checkbox } from "@/ui/shared/Checkbox"

describe("Checkbox", () => {
    it("renders unchecked by default", () => {
        cy.mount(<Checkbox />)
        cy.get(".indicator").should("not.exist")
    })

    it("indicator is visible when checked", () => {
        cy.mount(<Checkbox defaultChecked />)
        cy.get('[class*="indicator"]').should("be.visible")
    })
})

