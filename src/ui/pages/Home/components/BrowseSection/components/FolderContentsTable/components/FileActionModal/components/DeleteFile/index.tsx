import { fileStore } from "@/entities/File/store"
import Button from "@/ui/shared/Button"
import { observer } from "mobx-react-lite"
import styles from "./styles.module.scss"
import { useTranslation } from "react-i18next"

function DeleteFolderComponent() {
    const file = fileStore.selectedFiles[0]

    const { t } = useTranslation("home")

    if (!file) {
        return null
    }

    return (
        <div className={styles.deleteFileWrapper}>
            <p>{t("deleteFileModal.message")}</p>
            <div className={styles.submitRow}>
                <Button
                    variant="ghost"
                    type="button"
                    onClick={() => fileStore.closeActionModal()}
                    disabled={fileStore.isActionLoading}
                >
                    {t("deleteFileModal.cancel")}
                </Button>

                <Button
                    type="submit"
                    onClick={() => fileStore.deleteFile(file.id)}
                    loading={fileStore.isActionLoading}
                >
                    {t("deleteFileModal.delete")}
                </Button>
            </div>
        </div>
    )
}

const DeleteFolder = observer(DeleteFolderComponent)
export default DeleteFolder

