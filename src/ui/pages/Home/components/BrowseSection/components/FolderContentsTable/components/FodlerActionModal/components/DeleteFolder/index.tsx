import { folderStore } from "@/entities/Folder/store"
import Button from "@/ui/shared/Button"
import { observer } from "mobx-react-lite"
import styles from "./styles.module.scss"
import { useTranslation } from "react-i18next"

function DeleteFolderComponent() {
    const folder = folderStore.selectedFolders[0]

    const { t } = useTranslation("home")

    if (!folder) {
        return null
    }

    return (
        <div className={styles.deleteFolderWrapper}>
            <p>{t("deleteFolderModal.message")}</p>
            <div className={styles.submitRow}>
                <Button
                    variant="ghost"
                    type="button"
                    onClick={() => folderStore.setModalAction(null)}
                    disabled={folderStore.isActionLoading}
                >
                    {t("deleteFolderModal.cancel")}
                </Button>

                <Button
                    type="submit"
                    onClick={() => folderStore.deleteFolder(folder.id)}
                    loading={folderStore.isActionLoading}
                >
                    {t("deleteFolderModal.delete")}
                </Button>
            </div>
        </div>
    )
}

const DeleteFolder = observer(DeleteFolderComponent)
export default DeleteFolder

