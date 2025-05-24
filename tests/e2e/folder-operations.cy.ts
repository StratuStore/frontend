import { random } from "../../src/utils/random"
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

    it("should allow to change folder name", () => {
        cy.visit("/")
        cy.waitForRefresh()

        getFolderRow(FOLDER_ID).should("be.visible")
        getFolderRow(FOLDER_ID).click()
        getFolderRow(FOLDER_ID).rightclick()

        cy.dataTestId(TEST_IDS.ContextMenuContent).should("be.visible")
        cy.dataTestId(TEST_IDS.ContextMenuContent)
            .contains("Rename")
            .should("be.visible")
            .click()

        cy.dataTestId(TEST_IDS.ModalBackdrop).should("exist")
        cy.dataTestId(TEST_IDS.ModalContent).should("be.visible")

        const newFolderName = random.string(10) + ".txt"

        cy.dataTestId(TEST_IDS.RenameFolderInput)
            .should("be.visible")
            .type(newFolderName)

        cy.dataTestId(TEST_IDS.RenameFolderSubmitButton)
            .should("be.visible")
            .click()
    })

    it("should allow to delete a folder", () => {
        cy.visit("/")
        cy.waitForRefresh()

        getFolderRow(FOLDER_ID).should("be.visible")
        getFolderRow(FOLDER_ID).click()
        getFolderRow(FOLDER_ID).rightclick()

        cy.dataTestId(TEST_IDS.ContextMenuContent).should("be.visible")
        cy.dataTestId(TEST_IDS.ContextMenuContent)
            .contains("Delete")
            .should("be.visible")
            .click()
    })
})

