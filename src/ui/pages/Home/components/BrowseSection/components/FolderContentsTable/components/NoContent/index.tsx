import styles from "./styles.module.scss"
import { folderStore } from "@/entities/Folder/store"
import { observer } from "mobx-react-lite"
import { fileStore } from "@/entities/File/store"
import Button from "@/ui/shared/Button"
import FolderActionModal from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/components/FodlerActionModal"
import FolderContentsContextMenu from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/components/FolderContextMenu"
import { useTranslation } from "react-i18next"

function NoContentComponent() {
    const folder = folderStore.currentFolder
    const { t } = useTranslation("home")

    if (!folder) {
        return null
    }

    return (
        <FolderContentsContextMenu>
            <div
                className={styles.noContentWrapper}
                onClick={() => fileStore.startFileUpload(folder)}
            >
                <p className={styles.caption}>
                    {t("folderContentsTable.noContentHeading")}
                </p>
                <p className={styles.caption}>
                    {t("folderContentsTable.noContentClickThisArea")}
                </p>
                <p className={styles.caption}>
                    {t("folderContentsTable.noContentCreateAFolder")}
                </p>
                <div className={styles.buttonWrapper}>
                    <Button
                        className={styles.newFolderButton}
                        onClick={(e) => {
                            e.stopPropagation()
                            folderStore.showCreateFolderModal()
                        }}
                    >
                        {t("folderContentsTable.noContentCreateFolderButton")}
                    </Button>
                </div>
            </div>

            <FolderActionModal />
        </FolderContentsContextMenu>
    )
}

const NoContent = observer(NoContentComponent)
export default NoContent

