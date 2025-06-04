import { fileStore } from "@/entities/File/store"
import Button from "@/ui/shared/Button"
import { observer } from "mobx-react-lite"
import styles from "./styles.module.scss"

function DeleteFolderComponent() {
    const file = fileStore.selectedFiles[0]

    if (!file) {
        return null
    }

    return (
        <div className={styles.deleteFileWrapper}>
            <p>
                Are you sure you want to delete this file? This action is
                irreversible.
            </p>
            <div className={styles.submitRow}>
                <Button
                    variant="ghost"
                    type="button"
                    onClick={() => fileStore.closeActionModal()}
                    disabled={fileStore.isActionLoading}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    onClick={() => fileStore.deleteFile(file.id)}
                    loading={fileStore.isActionLoading}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}

const DeleteFolder = observer(DeleteFolderComponent)
export default DeleteFolder

