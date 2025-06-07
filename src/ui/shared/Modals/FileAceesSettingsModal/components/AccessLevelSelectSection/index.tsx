import styles from "./styles.module.scss"
import { useState } from "react"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import Input from "@/ui/shared/Input"
import Button from "@/ui/shared/Button"
import AccessLevelSelect from "@/ui/shared/AccessLevelSelect"
import { AccessLevel } from "@/ui/shared/AccessLevelSelect/constants"
import { useTranslation } from "react-i18next"
import { fileStore } from "@/entities/File/store"
import { observer } from "mobx-react-lite"
import { File } from "@/entities/File"
import toast from "react-hot-toast"

export type AccessLevelSelectSectionProps = {
    file: File
}

function AccessLevelSelectSectionComponent({
    file,
}: AccessLevelSelectSectionProps) {
    const [level, setLevel] = useState(AccessLevel.Public)
    const isUpdatingAccessLevel = fileStore.isUpdatingFileAccess

    const { t } = useTranslation("common")

    const levelSelectDescriptions = {
        [AccessLevel.Public]: t(
            "accessLevelModal.publicAccessLevelDescription"
        ),
        [AccessLevel.Private]: t(
            "accessLevelModal.privateAccessLevelDescription"
        ),
    }

    const shareUrl = `${window.location.origin}/share/${file.id}`

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
                        onChange={(level) =>
                            fileStore.updateAccessLevel(
                                file.id,
                                level === AccessLevel.Public
                            )
                        }
                    />
                </div>
                <p className={styles.accessLevelCaption}>
                    {isUpdatingAccessLevel
                        ? t("accessLevelModal.updatingAccessLevel")
                        : levelSelectDescriptions[level]}
                </p>
            </div>

            <div className={styles.linkWrapper}>
                <Input disabled placeholder={shareUrl} />
                <Button
                    onClick={() => {
                        navigator.clipboard.writeText(shareUrl)
                        toast.success(t("accessLevelModal.linkCopied"))
                    }}
                >
                    {t("accessLevelModal.copyLink")}
                </Button>
            </div>
        </div>
    )
}

const AccessLevelSelectSection = observer(AccessLevelSelectSectionComponent)
export default AccessLevelSelectSection

