import { AccessLevel } from "@/ui/shared/AccessLevelSelect/constants"
import Select from "@/ui/shared/Select"
import { useTranslation } from "react-i18next"

export type AccessLevelSelectProps = {
    level: AccessLevel | ""
    setLevel: (level: AccessLevel) => void
    triggerClassName?: string
    onChange?: (level: AccessLevel) => void
}

export default function AccessLevelSelect({
    level,
    setLevel,
    triggerClassName = "",
    onChange,
}: AccessLevelSelectProps) {
    const { t } = useTranslation("common")

    const levelSelectItems = [
        { label: t("accessLevelSelect.public"), value: AccessLevel.Public },
        { label: t("accessLevelSelect.private"), value: AccessLevel.Private },
    ]

    return (
        <Select
            items={levelSelectItems}
            value={level}
            onValueChange={(value) => {
                setLevel(value as AccessLevel)

                if (typeof onChange === "function") {
                    onChange(value as AccessLevel)
                }
            }}
            placeholder={t("accessLevelSelect.placeholder")}
            triggerProps={{ className: triggerClassName }}
        />
    )
}

