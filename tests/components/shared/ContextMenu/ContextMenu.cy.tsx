import ContextMenu, { ContextMenuProps } from "@/ui/shared/ContextMenu"

function createProps(overrides?: Partial<ContextMenuProps>): ContextMenuProps {
    return {
        children: <button>Open Menu</button>,
        groups: [
            {
                header: "Group 1",
                items: [
                    {
                        label: "Item 1",
                        onClick: () => {},
                        iconName: undefined,
                        visible: true,
                    },
                    {
                        label: "Item 2",
                        onClick: () => {},
                        iconName: undefined,
                        visible: false,
                    },
                ],
            },
            {
                header: "Group 2",
                items: [
                    {
                        label: "Item 3",
                        onClick: () => {},
                        iconName: undefined,
                        visible: true,
                    },
                ],
            },
        ],
        ...overrides,
    }
}

describe("ContextMenu", () => {
    it("renders trigger button", () => {
        cy.mount(<ContextMenu {...createProps()} />)
        cy.findByRole("button", { name: "Open Menu" }).should("be.visible")
    })

    it("shows menu on right click", () => {
        cy.mount(<ContextMenu {...createProps()} />)
        cy.findByRole("button", { name: "Open Menu" }).rightclick()

        cy.contains("Group 1").should("be.visible")
        cy.contains("Item 1").should("be.visible")
        cy.contains("Group 2").should("be.visible")
        cy.contains("Item 3").should("be.visible")
    })

    it("does not render invisible items", () => {
        cy.mount(<ContextMenu {...createProps()} />)
        cy.findByRole("button", { name: "Open Menu" }).rightclick()
        cy.contains("Item 2").should("not.exist")
    })

    it("does not render group if all items are invisible", () => {
        const props = createProps({
            groups: [
                {
                    header: "Hidden Group",
                    items: [
                        { label: "Hidden", onClick: () => {}, visible: false },
                    ],
                },
            ],
        })

        cy.mount(<ContextMenu {...props} />)
        cy.findByRole("button", { name: "Open Menu" }).rightclick()
        cy.contains("Hidden Group").should("not.exist")
        cy.contains("Hidden").should("not.exist")
    })

    it("renders only visible items", () => {
        const props = createProps({
            groups: [
                {
                    header: "Group",
                    items: [
                        { label: "Visible", onClick: () => {}, visible: true },
                        { label: "Hidden", onClick: () => {}, visible: false },
                    ],
                },
            ],
        })

        cy.mount(<ContextMenu {...props} />)
        cy.findByRole("button", { name: "Open Menu" }).rightclick()
        cy.contains("Visible").should("be.visible")
        cy.contains("Hidden").should("not.exist")
    })

    it("renders group label if provided", () => {
        const props = createProps({
            groups: [
                {
                    header: "My Group",
                    items: [{ label: "A", onClick: () => {}, visible: true }],
                },
            ],
        })

        cy.mount(<ContextMenu {...props} />)
        cy.findByRole("button", { name: "Open Menu" }).rightclick()
        cy.contains("My Group").should("be.visible")
    })

    it("does not render group label if not provided", () => {
        const props = createProps({
            groups: [
                {
                    items: [{ label: "A", onClick: () => {}, visible: true }],
                },
            ],
        })

        cy.mount(<ContextMenu {...props} />)
        cy.findByRole("button", { name: "Open Menu" }).rightclick()
        cy.contains("My Group").should("not.exist")
    })
})

