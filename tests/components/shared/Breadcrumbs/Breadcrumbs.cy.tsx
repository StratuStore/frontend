import Breadcrumbs from "@/ui/shared/Breadcrumbs"

describe("Breadcrumbs component", () => {
    const segments = ["Home", "Library", "Data"]

    it("renders all segments", () => {
        cy.mount(<Breadcrumbs segments={segments} />)

        segments.forEach((segment) => {
            cy.contains(segment).should("be.visible")
        })
    })

    it("renders separators between segments", () => {
        cy.mount(<Breadcrumbs segments={segments} />)

        cy.get("[class*=separator]").should("have.length", segments.length - 1)
    })

    it("calls onSegmentClick when a segment is clicked", () => {
        const onSegmentClickSpy = cy.spy().as("segmentClickSpy")

        cy.mount(
            <Breadcrumbs
                segments={segments}
                onSegmentClick={onSegmentClickSpy}
            />
        )

        cy.contains("Library").click()
        cy.get("@segmentClickSpy").should("have.been.calledWith", "Library")
    })

    it("last segment is rendered without separator", () => {
        cy.mount(<Breadcrumbs segments={segments} />)

        const lastSegment = segments[segments.length - 1]
        cy.contains(lastSegment).then(($el) => {
            const nextSibling = $el[0].nextSibling

            if (nextSibling) {
                expect(
                    (nextSibling as HTMLElement).className || ""
                ).not.to.include("separator")
            }
        })
    })
})

