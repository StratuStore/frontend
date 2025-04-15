import configStore from "@/config/store"
import { Theme } from "@/themes/types"
import Select from "@/ui/shared/Select"
import { observer } from "mobx-react-lite"

const themeOptions = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" },
]

function ThemePickerComponent() {
    const currentTheme = configStore.theme

    return (
        <Select
            placeholder="Select theme..."
            items={themeOptions}
            onValueChange={(theme) => configStore.setTheme(theme as Theme)}
            defaultValue={currentTheme}
        />
    )
}

const ThemePicker = observer(ThemePickerComponent)
export default ThemePicker

