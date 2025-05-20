import Input from "@/ui/shared/Input"

describe("Input component", () => {
    it("renders with default props", () => {
        cy.mount(<Input />)
        cy.get("input").should("be.visible")
    })

    it("renders with a value", () => {
        cy.mount(<Input value="test value" readOnly />)
        cy.get("input").should("have.value", "test value")
    })

    it("applies valid class when touched and valid", () => {
        cy.mount(<Input touched valid />)
        cy.get("input").should(($el) => {
            expect($el[0].className).to.match(/valid/)
        })
    })

    it("applies invalid class when touched and not valid", () => {
        cy.mount(<Input touched valid={false} />)
        cy.get("input").should(($el) => {
            expect($el[0].className).to.match(/invalid/)
        })
    })

    it("renders prependInner and appendInner", () => {
        cy.mount(
            <Input
                prependInner={<span>Pre</span>}
                appendInner={<span>Post</span>}
            />
        )
        cy.contains("Pre").should("be.visible")
        cy.contains("Post").should("be.visible")
    })
})

