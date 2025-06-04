import Modal from "@/ui/shared/Modal"
import { observer } from "mobx-react-lite"
import styles from "./styles.module.scss"
import { fileStore } from "@/entities/File/store"
import { FileModalAction } from "@/entities/File/store/types"
import RenameFile from "./components/RenameFile"
import DeleteFile from "./components/DeleteFile"

function FileActionModalComponent() {
    const open = fileStore.modalAction !== null

    const renderBodySections = () => {
        switch (fileStore.modalAction) {
            case FileModalAction.Rename:
                return <RenameFile />
            case FileModalAction.Delete:
                return <DeleteFile />
        }
    }

    const getHeading = () => {
        switch (fileStore.modalAction) {
            case FileModalAction.Rename:
                return "Rename file"
            case FileModalAction.Delete:
                return "Delete file"
        }
    }

    return (
        <Modal
            open={open}
            renderBodySections={[renderBodySections]}
            renderHeading={() => getHeading()}
            contentClasses={styles.content}
            closeModal={() => fileStore.closeActionModal()}
        />
    )
}

const FileActionModal = observer(FileActionModalComponent)
export default FileActionModal

