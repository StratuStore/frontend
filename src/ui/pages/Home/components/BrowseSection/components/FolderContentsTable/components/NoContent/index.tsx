import { useFileUpload } from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/hooks/useFileUpload"
import styles from "./styles.module.scss"
import { folderStore } from "@/entities/Folder/store"
import { observer } from "mobx-react-lite"

function NoContentComponent() {
    const { fileInputRef, handleFileInputChange, handleUploadClick } =
        useFileUpload()
    const folder = folderStore.currentFolder

    if (!folder) {
        return null
    }

    return (
        <div
            className={styles.noContentWrapper}
            onClick={() => handleUploadClick(folder)}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileInputChange}
                multiple
            />

            <p className={styles.caption}>This folder is empty</p>
            <p className={styles.caption}>
                Click this area to upload a file to this folder
            </p>
        </div>
    )
}

const NoContent = observer(NoContentComponent)
export default NoContent

