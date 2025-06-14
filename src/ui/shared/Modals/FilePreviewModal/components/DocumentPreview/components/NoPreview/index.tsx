import { File } from "@/entities/File"
import { useTranslation } from "react-i18next"
import styles from "./styles.module.scss"
import Button from "@/ui/shared/Button"
import { fileStore } from "@/entities/File/store"

export type NoPreviewProps = {
    file: File
}

export default function NoPreview({ file }: NoPreviewProps) {
    const { t } = useTranslation("home")

    return (
        <div className={styles.noPreview}>
            <p className={styles.title}>
                {t("documentPreview.noPreview.title")}
            </p>
            <p className={styles.message}>
                {t("documentPreview.noPreview.message")}
            </p>
            <div className={styles.buttonWrapper}>
                <Button onClick={() => fileStore.downloadFile(file)}>
                    {t("documentPreview.noPreview.download")}
                </Button>
            </div>
        </div>
    )
}

