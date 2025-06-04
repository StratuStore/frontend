import styles from "./styles.module.scss"
import { useState } from "react"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import Input from "@/ui/shared/Input"
import Button from "@/ui/shared/Button"
import AccessLevelSelect from "@/ui/shared/AccessLevelSelect"
import { AccessLevel } from "@/ui/shared/AccessLevelSelect/constants"
import { useTranslation } from "react-i18next"

export default function AccessLevelSelectSection() {
    const [level, setLevel] = useState(AccessLevel.Public)

    const { t } = useTranslation("common")

    const levelSelectDescriptions = {
        [AccessLevel.Public]: t(
            "accessLevelModal.publicAccessLevelDescription"
        ),
        [AccessLevel.Private]: t(
            "accessLevelModal.privateAccessLevelDescription"
        ),
    }

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
                    <AccessLevelSelect
                        level={level}
                        setLevel={(newLevel) => setLevel(newLevel)}
                    />
                </div>
                <p className={styles.accessLevelCaption}>
                    {levelSelectDescriptions[level]}
                </p>
            </div>

            <div className={styles.linkWrapper}>
                <Input disabled placeholder="https://some-link.com/this-file" />
                <Button>{t("accessLevelModal.copyLink")}</Button>
            </div>
        </div>
    )
}

