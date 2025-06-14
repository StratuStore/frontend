import { folderStore } from "@/entities/Folder/store"
import { FolderModalAction } from "@/entities/Folder/store/types"
import Modal from "@/ui/shared/Modal"
import { observer } from "mobx-react-lite"
import styles from "./styles.module.scss"
import CreateFolder from "./components/CreateFolder"
import RenameFolder from "./components/RenameFolder"
import DeleteFolder from "./components/DeleteFolder"
import { useTranslation } from "react-i18next"

function FolderActionModalComponent() {
    const open = folderStore.modalAction !== null

    const { t } = useTranslation("home")

    const renderBodySections = () => {
        switch (folderStore.modalAction) {
            case FolderModalAction.Create:
                return <CreateFolder />
            case FolderModalAction.Rename:
                return <RenameFolder />
            case FolderModalAction.Delete:
                return <DeleteFolder />
        }
    }

    const getHeading = () => {
        switch (folderStore.modalAction) {
            case FolderModalAction.Create:
                return t("createFolderModal.heading")
            case FolderModalAction.Rename:
                return t("renameFolderModal.heading")
            case FolderModalAction.Delete:
                return t("deleteFolderModal.heading")
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

