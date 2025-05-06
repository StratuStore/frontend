import { folderStore } from "@/entities/Folder/store"
import { FolderModalAction } from "@/entities/Folder/store/types"
import Modal from "@/ui/shared/Modal"
import { observer } from "mobx-react-lite"
import styles from "./styles.module.scss"
import CreateFolder from "./components/CreateFolder"
import RenameFolder from "./components/RenameFolder"

function FolderActionModalComponent() {
    const open = folderStore.modalAction !== null

    const renderBodySections = () => {
        switch (folderStore.modalAction) {
            case FolderModalAction.Create:
                return <CreateFolder />
            case FolderModalAction.Rename:
                return <RenameFolder />
        }
    }

    const getHeading = () => {
        switch (folderStore.modalAction) {
            case FolderModalAction.Create:
                return "Create Folder"
            case FolderModalAction.Rename:
                return "Rename Folder"
        }
    }

    return (
        <Modal
            open={open}
            renderBodySections={[renderBodySections]}
            renderHeading={() => getHeading()}
            contentClasses={styles.content}
            closeModal={() => folderStore.setModalAction(null)}
        />
    )
}

const FolderActionModal = observer(FolderActionModalComponent)
export default FolderActionModal

