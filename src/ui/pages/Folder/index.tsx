import styles from "./styles.module.scss"
import FolderContentsTable from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable"
import { observer } from "mobx-react-lite"
import { folderStore } from "@/entities/Folder/store"
import { useTranslation } from "react-i18next"
import FileUploadPopup from "@/ui/pages/Home/components/BrowseSection/components/FileUploadPopup"
import { useEffect } from "react"
import { useParams } from "react-router"
import FolderNavigationBreadcrumbs from "@/ui/pages/Folder/components/FolderNavigationBreadcrumbs"

function FolderPageComponent() {
    const { t } = useTranslation("home")
    const currentFolder = folderStore.currentFolder
    const { id: folderId } = useParams()

    useEffect(() => {
        if (!folderId) {
            return
        }

        folderStore.currentFolderId = folderId
        folderStore.getFolderById(folderId)
    }, [folderId])

    return (
        <div className={styles.folderPageWrapper}>
            <div className={styles.headerWrapper}>
                <h2 className={styles.header}>{t("browseSection.title")}</h2>
            </div>
            <div className={styles.breadcrumbsWrapper}>
                <FolderNavigationBreadcrumbs />
            </div>
            <div className={styles.contentsTableWrapper}>
                <FolderContentsTable
                    files={currentFolder?.files ?? []}
                    folders={currentFolder?.folders ?? []}
                    loading={folderStore.isLoading}
                    isCurrentFolderReady={folderStore.isCurrentFolderReady}
                />
            </div>
            <FileUploadPopup />
        </div>
    )
}

const FolderPage = observer(FolderPageComponent)
export default FolderPage

