import styles from "./styles.module.scss"
import { folderStore } from "@/entities/Folder/store"
import { observer } from "mobx-react-lite"
import { fileStore } from "@/entities/File/store"
import Button from "@/ui/shared/Button"
import FolderActionModal from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/components/FodlerActionModal"
import FolderContentsContextMenu from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/components/FolderContextMenu"

function NoContentComponent() {
    const folder = folderStore.currentFolder

    if (!folder) {
        return null
    }

    return (
        <FolderContentsContextMenu>
            <div
                className={styles.noContentWrapper}
                onClick={() => fileStore.startFileUpload(folder)}
            >
                <p className={styles.caption}>This folder is empty</p>
                <p className={styles.caption}>
                    Click this area to upload a file to this folder
                </p>
                <p className={styles.caption}>
                    Or you can create a new folder by clicking the "New Folder"
                    button
                </p>
                <div className={styles.buttonWrapper}>
                    <Button
                        className={styles.newFolderButton}
                        onClick={(e) => {
                            e.stopPropagation()
                            folderStore.showCreateFolderModal()
                        }}
                    >
                        Create new folder
                    </Button>
                </div>
            </div>

            <FolderActionModal />
        </FolderContentsContextMenu>
    )
}

const NoContent = observer(NoContentComponent)
export default NoContent

