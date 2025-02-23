import { Theme } from "./types"
import { THEME_LS_KEY } from "./constants"

const themeMedia = matchMedia("(prefers-color-scheme: light)")
const htmlElement = document.documentElement
const lightStyles = document.querySelector("#light-styles")!
const darkStyles = document.querySelector("#dark-styles")!

function inferPreferredTheme(): Theme {
    const savedTheme = localStorage.getItem(THEME_LS_KEY) as Theme

    if (savedTheme) {
        return savedTheme
    }

    const prefersLightTheme = themeMedia.matches

    if (prefersLightTheme) {
        return Theme.Light
    }

    return Theme.Dark
}

function setTheme() {
    const preferredTheme = inferPreferredTheme()
    const currentTheme = htmlElement.getAttribute("data-theme") as Theme

    if (currentTheme === preferredTheme) {
        return
    }

    const nextTheme = currentTheme ? currentTheme : preferredTheme

    if (nextTheme === Theme.Light) {
        lightStyles.setAttribute("media", "all")
        darkStyles.setAttribute("media", "not all")
    }

    if (nextTheme === Theme.Dark) {
        darkStyles.setAttribute("media", "all")
        lightStyles.setAttribute("media", "not all")
    }

    if (nextTheme === Theme.System) {
        lightStyles.setAttribute("media", "(prefers-color-scheme: light)")
        darkStyles.setAttribute("media", "(prefers-color-scheme: dark)")
    }

    document.documentElement.setAttribute("data-theme", nextTheme)
    localStorage.setItem(THEME_LS_KEY, nextTheme)
}

themeMedia.addEventListener("change", setTheme)
const themeObserver = new MutationObserver(setTheme)
themeObserver.observe(htmlElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
})

setTheme()

