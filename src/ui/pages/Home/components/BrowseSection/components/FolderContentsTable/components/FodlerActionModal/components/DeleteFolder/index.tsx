import { folderStore } from "@/entities/Folder/store"
import Button from "@/ui/shared/Button"
import { observer } from "mobx-react-lite"
import styles from "./styles.module.scss"

function DeleteFolderComponent() {
    const folder = folderStore.selectedFolders[0]

    if (!folder) {
        return null
    }

    return (
        <div className={styles.deleteFolderWrapper}>
            <p>
                Are you sure you want to delete this folder? <b>All</b> included
                items will be deleted. This action is irreversible.
            </p>
            <div className={styles.submitRow}>
                <Button
                    variant="ghost"
                    type="button"
                    onClick={() => folderStore.setModalAction(null)}
                    disabled={folderStore.isActionLoading}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    onClick={() => folderStore.deleteFolder(folder.id)}
                    loading={folderStore.isActionLoading}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}

const DeleteFolder = observer(DeleteFolderComponent)
export default DeleteFolder

