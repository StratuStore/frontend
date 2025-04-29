import Button from "@/ui/shared/Button"
import { useTranslation } from "react-i18next"
import styles from "./styles.module.scss"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import clsx from "clsx"
import { observer } from "mobx-react-lite"
import { fileUploadStore } from "@/entities/FileUpload/store"

export type HeaderProps = {
    isExpanded: boolean
    onExpand: () => void
}

function HeaderComponent({ isExpanded, onExpand }: HeaderProps) {
    const { t } = useTranslation("home")
    const uploadingFilesCount = fileUploadStore.uploadCount

    return (
        <div className={clsx(styles.header, { [styles.expanded]: isExpanded })}>
            <p className={styles.caption}>
                {t("fileUploadPopup.uploadingFiles", {
                    count: uploadingFilesCount,
                })}
            </p>

            <div className={styles.actions}>
                <Button variant="icon" onClick={onExpand}>
                    <Icon
                        name={IconName.ChevronDown}
                        className={clsx(styles.chevron)}
                    />
                </Button>
                <Button variant="icon">
                    <Icon name={IconName.WindowClose} />
                </Button>
            </div>
        </div>
    )
}

const Header = observer(HeaderComponent)
export default Header

