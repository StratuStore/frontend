import configStore from "@/config/store"
import { TEST_HEADER } from "@/shared/constants/tests/header"
import { Theme } from "@/themes/types"
import Select from "@/ui/shared/Select"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"

function ThemePickerComponent() {
    const { t } = useTranslation("common")
    const currentTheme = configStore.theme

    const themeOptions = [
        { label: t("themePicker.light"), value: "light" },
        { label: t("themePicker.dark"), value: "dark" },
        { label: t("themePicker.system"), value: "system" },
    ]

    return (
        <Select
            placeholder="Select theme..."
            items={themeOptions}
            onValueChange={(theme) => configStore.setTheme(theme as Theme)}
            defaultValue={currentTheme}
            triggerProps={{
                "data-testid": TEST_HEADER.ThemePicker,
            }}
        />
    )
}

const ThemePicker = observer(ThemePickerComponent)
export default ThemePicker

