import { Theme } from "@/themes/types"
import { autorun, makeAutoObservable } from "mobx"

class ConfigStore {
    constructor() {
        makeAutoObservable(this)
    }

    theme: Theme =
        (document.documentElement.getAttribute("data-theme") as Theme) ||
        Theme.System

    setTheme(theme: Theme) {
        this.theme = theme
    }
}

const configStore = new ConfigStore()

autorun(() => {
    document.documentElement.setAttribute("data-theme", configStore.theme)
})

export default configStore

