import {
    AccessLevel,
    levelSelectItems,
} from "@/ui/shared/AccessLevelSelect/constants"
import Select from "@/ui/shared/Select"

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
            placeholder="Select access level"
            triggerProps={{ className: triggerClassName }}
        />
    )
}

