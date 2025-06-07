import Modal from "@/ui/shared/Modal"
import styles from "./styles.module.scss"
import AccessLevelSelectSection from "@/ui/shared/Modals/FileAceesSettingsModal/components/AccessLevelSelectSection"
import { File } from "@/entities/File"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react-lite"

const renderAccessLevelSection = (file: File) => (
    <AccessLevelSelectSection file={file} />
)

export type FileAccessSettingsModalProps = {
    renderTrigger?: () => React.ReactNode
    file: File
    open?: boolean
    closeModal?: () => void
}

function FileAccessSettingsModalComponent({
    renderTrigger,
    file,
    open,
    closeModal,
}: FileAccessSettingsModalProps) {
    const { t } = useTranslation("common")

    const renderHeading = () => (
        <div className={styles.headingWrapper}>
            <p>{t("accessLevelModal.title")}</p>
            <p className={styles.subheading}>
                {t("accessLevelModal.description")}
            </p>
        </div>
    )

    return (
        <Modal
            renderTrigger={renderTrigger}
            renderHeading={renderHeading}
            renderBodySections={[() => renderAccessLevelSection(file)]}
            contentClasses={styles.modalContent}
            open={open}
            closeModal={closeModal}
        />
    )
}

const FileAccessSettingsModal = observer(FileAccessSettingsModalComponent)
export default FileAccessSettingsModal

