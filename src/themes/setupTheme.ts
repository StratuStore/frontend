import { Theme } from "./types"
import { THEME_LS_KEY } from "./constants"

const themeMedia = matchMedia("(prefers-color-scheme: light)")

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
    document.documentElement.setAttribute("data-theme", preferredTheme)
}

themeMedia.addEventListener("change", setTheme)

setTheme()

