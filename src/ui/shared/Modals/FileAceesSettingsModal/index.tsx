import Modal from "@/ui/shared/Modal"
import styles from "./styles.module.scss"
import AccessLevelSelectSection from "@/ui/shared/Modals/FileAceesSettingsModal/components/AccessLevelSelectSection"
import { File } from "@/entities/File"
import { useTranslation } from "react-i18next"

const renderAccessLevelSection = () => <AccessLevelSelectSection />

export type FileAccessSettingsModalProps = {
    renderTrigger?: () => React.ReactNode
    file: File
}

export default function FileAccessSettingsModal({
    renderTrigger,
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
            renderBodySections={[renderAccessLevelSection]}
            contentClasses={styles.modalContent}
        />
    )
}

