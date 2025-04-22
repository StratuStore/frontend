import Select from "@/ui/shared/Select"
import { useTranslation } from "react-i18next"
import { SelectItem } from "@/ui/shared/Select"

export default function LanguagePicker() {
    const { i18n, t } = useTranslation("common")

    const languages: SelectItem[] = [
        { label: "English", value: "en-US" },
        { label: "Українська", value: "ua" },
    ]

    const handleLanguageChange = (value: string) => {
        i18n.changeLanguage(value)
    }

    console.log("i18n.language", i18n.language)

    return (
        <Select
            placeholder={t("languagePicker.placeholder")}
            items={languages}
            value={i18n.language}
            onValueChange={handleLanguageChange}
        />
    )
}

