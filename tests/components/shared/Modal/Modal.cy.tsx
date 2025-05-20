import Modal from "@/ui/shared/Modal"

describe("Modal component", () => {
    it("renders trigger when provided", () => {
        const triggerText = "Open Modal"
        cy.mount(
            <Modal
                renderTrigger={() => <button>{triggerText}</button>}
                renderBodySections={[() => <div>Content</div>]}
            />
        )
        cy.contains(triggerText).should("be.visible")
    })

    it("renders heading when provided", () => {
        const headingText = "Modal Title"
        cy.mount(
            <Modal
                open={true}
                renderHeading={() => <span>{headingText}</span>}
                renderBodySections={[() => <div>Content</div>]}
            />
        )
        cy.contains(headingText).should("be.visible")
    })

    it("renders body sections correctly", () => {
        const section1Text = "Section 1"
        const section2Text = "Section 2"
        cy.mount(
            <Modal
                open={true}
                renderBodySections={[
                    () => <div>{section1Text}</div>,
                    () => <div>{section2Text}</div>,
                ]}
            />
        )
        cy.contains(section1Text).should("be.visible")
        cy.contains(section2Text).should("be.visible")
    })

    it("applies custom content classes", () => {
        const customClass = "custom-modal-class"
        cy.mount(
            <Modal
                open={true}
                contentClasses={customClass}
                renderBodySections={[() => <div>Content</div>]}
            />
        )
        cy.get("div")
            .filter((_, el) => {
                const className = el.className || ""
                return (
                    /content/.test(className) &&
                    new RegExp(customClass).test(className)
                )
            })
            .should("exist")
            .and("be.visible")
    })

    it("calls closeModal when close button is clicked", () => {
        const closeModal = cy.spy().as("closeModalSpy")
        cy.mount(
            <Modal
                open={true}
                closeModal={closeModal}
                renderBodySections={[() => <div>Content</div>]}
            />
        )
        cy.get("button").first().click()
        cy.get("@closeModalSpy").should("have.been.called")
    })

    it("is not visible when open is false", () => {
        const contentText = "Hidden Content"
        cy.mount(
            <Modal
                open={false}
                renderBodySections={[() => <div>{contentText}</div>]}
            />
        )
        cy.get("div")
            .filter((_, el) => /content/.test(el.className || ""))
            .should("have.length", 0)
    })

    it("renders overlay when modal is open", () => {
        cy.mount(
            <Modal
                open={true}
                renderBodySections={[() => <div>Content</div>]}
            />
        )
        cy.get("div")
            .filter((_, el) => /overlay/.test(el.className || ""))
            .should("exist")
    })

    it("renders close button by default", () => {
        cy.mount(
            <Modal
                open={true}
                renderBodySections={[() => <div>Content</div>]}
            />
        )
        cy.get("button").should("be.visible")
    })
})

