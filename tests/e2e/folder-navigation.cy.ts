import { TEST_IDS } from "../../src/shared/constants/tests/shared"

const FOLDER_ID = "folder-2"

describe("change theme flow", () => {
    beforeEach(() => {
        cy.mockAuth()
        cy.viewport(1920, 1080)
        window.localStorage.setItem("refresh_token", Cypress.env("mock_rt"))
    })

    function getFolderRow(folderId: string) {
        return cy.dataTestId(`${TEST_IDS.FolderRow}-${folderId}`)
    }

    it("should open a folder after double-clicking it", () => {
        cy.visit("/")
        cy.waitForRefresh()

        getFolderRow(FOLDER_ID).should("be.visible")
        getFolderRow(FOLDER_ID).dblclick()

        cy.url().should("include", `/folder/${FOLDER_ID}`)
    })

    it("should allow to navigate using breadcrumbs", () => {
        cy.visit(`/folder/${FOLDER_ID}/`)
        cy.waitForRefresh()

        cy.dataTestId(TEST_IDS.Breadcrumbs)
            .should("be.visible")
            .contains("root")
            .should("be.visible")
            .click()

        cy.url().should("include", `/`)
    })
})

