import Button from "@/ui/shared/Button"

const buttonVariants = ["primary", "ghost", "icon", "outline"] as const

describe("Button component", () => {
    it("renders children", () => {
        cy.mount(<Button>Click me</Button>)
        cy.contains("Click me").should("be.visible")
    })

    it("calls onClick when clicked", () => {
        const onClick = cy.stub().as("clickHandler")
        cy.mount(<Button onClick={onClick}>Click</Button>)
        cy.get("button").click()
        cy.get("@clickHandler").should("have.been.calledOnce")
    })

    it("is disabled when disabled prop is true", () => {
        cy.mount(<Button disabled>Disabled</Button>)
        cy.get("button").should("be.disabled")
    })

    it("is disabled when loading prop is true", () => {
        cy.mount(<Button loading>Loading</Button>)
        cy.get("button").should("be.disabled")
    })

    it("shows spinner when loading", () => {
        cy.mount(<Button loading>Loading</Button>)
        cy.get("svg").should("be.visible")
        cy.contains("Loading").should("exist")
    })

    it("hides children visually when loading", () => {
        cy.mount(<Button loading>Hidden</Button>)
        cy.get("span[class*=hiddenContent]").should(
            "have.css",
            "visibility",
            "hidden"
        )
    })

    buttonVariants.forEach((variant) => {
        it(`applies correct class for variant: ${variant}`, () => {
            cy.mount(<Button variant={variant}>Test</Button>)
            cy.get("button")
                .invoke("attr", "class")
                .should("match", new RegExp(`${variant}`))
        })
    })

    it("applies custom className", () => {
        cy.mount(<Button className="custom-class">Custom</Button>)
        cy.get("button").should("have.class", "custom-class")
    })
})

