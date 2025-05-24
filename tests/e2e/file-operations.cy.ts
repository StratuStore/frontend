import { random } from "../../src/utils/random"
import { TEST_IDS } from "../../src/shared/constants/tests/shared"

const FILE_ID = "file-1"

describe("change theme flow", () => {
    beforeEach(() => {
        cy.mockAuth()
        cy.viewport(1920, 1080)
        window.localStorage.setItem("refresh_token", Cypress.env("mock_rt"))
    })

    function getFileRow(fileId: string) {
        return cy.dataTestId(`${TEST_IDS.FileRow}-${fileId}`)
    }

    it("should allow to change file name", () => {
        cy.visit("/")
        cy.waitForRefresh()

        getFileRow(FILE_ID).should("be.visible")
        getFileRow(FILE_ID).click()
        getFileRow(FILE_ID).rightclick()

        cy.dataTestId(TEST_IDS.ContextMenuContent).should("be.visible")
        cy.dataTestId(TEST_IDS.ContextMenuContent)
            .contains("Rename")
            .should("be.visible")
            .click()

        cy.dataTestId(TEST_IDS.ModalBackdrop).should("exist")
        cy.dataTestId(TEST_IDS.ModalContent).should("be.visible")

        const newFileName = random.string(10) + ".txt"

        cy.dataTestId(TEST_IDS.RenameFileInput)
            .should("be.visible")
            .type(newFileName)

        cy.dataTestId(TEST_IDS.RenameFileSubmitButton)
            .should("be.visible")
            .click()
    })

    it("should allow to delete a file", () => {
        cy.visit("/")
        cy.waitForRefresh()

        getFileRow(FILE_ID).should("be.visible")
        getFileRow(FILE_ID).click()
        getFileRow(FILE_ID).rightclick()

        cy.dataTestId(TEST_IDS.ContextMenuContent).should("be.visible")
        cy.dataTestId(TEST_IDS.ContextMenuContent)
            .contains("Delete")
            .should("be.visible")
            .click()
    })
})

