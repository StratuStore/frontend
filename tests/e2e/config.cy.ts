import { TEST_HEADER } from "../../src/shared/constants/tests/header"
import { TEST_IDS } from "../../src/shared/constants/tests/shared"

describe("change theme flow", () => {
    beforeEach(() => {
        cy.mockAuth()
        cy.viewport(1920, 1080)
        window.localStorage.setItem("refresh_token", Cypress.env("mock_rt"))
    })

    it("should change theme", () => {
        cy.visit("/")
        cy.waitForRefresh()

        cy.dataTestId(TEST_HEADER.SettingsTrigger).click()
        cy.dataTestId(TEST_HEADER.ConfigurationMenu).should("be.visible")

        cy.dataTestId(TEST_HEADER.ThemePicker).should("be.visible").click()

        cy.dataTestId(TEST_IDS.PopoverContent).should("be.visible")
        cy.dataTestId(TEST_IDS.PopoverContent).contains("Light").click()

        cy.get("html").should("have.attr", "data-theme", "light")
    })

    it("should change locale", () => {
        cy.visit("/")
        cy.waitForRefresh()

        cy.dataTestId(TEST_HEADER.SettingsTrigger).click()
        cy.dataTestId(TEST_HEADER.ConfigurationMenu).should("be.visible")

        cy.dataTestId(TEST_HEADER.LanguagePicker).should("be.visible").click()

        cy.dataTestId(TEST_IDS.PopoverContent).should("be.visible")
        cy.dataTestId(TEST_IDS.PopoverContent).contains("Українська").click()

        cy.get("html").should("have.attr", "lang", "ua")
    })
})

