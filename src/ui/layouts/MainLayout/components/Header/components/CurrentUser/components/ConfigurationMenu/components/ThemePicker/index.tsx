import { Theme } from "@/themes/types"
import Select from "@/ui/shared/Select"

const themeOptions = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" },
]

function handleThemeChange(theme: Theme) {
    document.documentElement.setAttribute("data-theme", theme)
}

export default function ThemePicker() {
    return (
        <Select
            placeholder="Select theme..."
            items={themeOptions}
            onValueChange={handleThemeChange}
        />
    )
}

