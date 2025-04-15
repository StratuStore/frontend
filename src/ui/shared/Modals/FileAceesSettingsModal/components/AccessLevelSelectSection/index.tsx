import Select from "@/ui/shared/Select"
import styles from "./styles.module.scss"
import { useState } from "react"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import Input from "@/ui/shared/Input"
import Button from "@/ui/shared/Button"

enum AccessLevel {
    Public = "public",
    Restricted = "restricted",
    Private = "private",
}

const levelSelectItems = [
    { label: "Public", value: AccessLevel.Public },
    { label: "Restricted", value: AccessLevel.Restricted },
    { label: "Private", value: AccessLevel.Private },
]

const levelSelectDescriptions = {
    [AccessLevel.Public]: "Anyone with the link can access the file",
    [AccessLevel.Restricted]: "Only people with the link can view the file",
    [AccessLevel.Private]: "Only you can access the file",
}

export default function AccessLevelSelectSection() {
    const [level, setLevel] = useState(levelSelectItems[0].value)

    return (
        <div className={styles.sectionWrapper}>
            <div className={styles.selectHeadingWrapper}>
                <p className={styles.selectHeading}>Choose access level</p>
                <div className={styles.headingIconWrapper}>
                    <Icon
                        name={IconName.LockOutline}
                        width="18px"
                        height="18px"
                    />
                </div>
            </div>

            <div className={styles.selectWrapper}>
                <div className={styles.selectComponentWrapper}>
                    <Select
                        items={levelSelectItems}
                        value={level}
                        onValueChange={(value) =>
                            setLevel(value as AccessLevel)
                        }
                    />
                </div>
                <p className={styles.accessLevelCaption}>
                    {levelSelectDescriptions[level]}
                </p>
            </div>

            <div className={styles.linkWrapper}>
                <Input disabled placeholder="https://some-link.com/this-file" />
                <Button>Copy link</Button>
            </div>
        </div>
    )
}

