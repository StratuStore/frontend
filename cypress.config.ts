import { defineConfig } from "cypress"

export default defineConfig({
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
    },

    e2e: {
        specPattern: "tests/e2e/**/*.cy.{js,jsx,ts,tsx}",
        supportFile: "cypress/support/e2e.ts",
        baseUrl: "http://localhost:3000",
    },
})

