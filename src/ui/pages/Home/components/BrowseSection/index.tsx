import Breadcrumbs from "@/ui/shared/Breadcrumbs"
import styles from "./styles.module.scss"
import FolderContentsTable from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable"
import { observer } from "mobx-react-lite"
import { folderStore } from "@/entities/Folder/store"
import { useTranslation } from "react-i18next"
import FileUploadPopup from "@/ui/pages/Home/components/BrowseSection/components/FileUploadPopup"
import { useEffect } from "react"

function BrowseSectionComponent() {
    const { t } = useTranslation("home")
    const currentFolder = folderStore.currentFolder

    useEffect(() => {
        folderStore.getRootFolder()
    }, [])

    const foldersCount = currentFolder?.folders.length ?? 0
    const filesCount = currentFolder?.files.length ?? 0

    const hasMore = foldersCount + filesCount < folderStore.pagination.total

    return (
        <div className={styles.browseSectionWrapper}>
            <div className={styles.headerWrapper}>
                <h2 className={styles.header}>{t("browseSection.title")}</h2>
            </div>
            <div className={styles.breadcrumbsWrapper}>
                <Breadcrumbs segments={["root"]} />
            </div>
            <div className={styles.contentsTableWrapper}>
                <FolderContentsTable
                    files={currentFolder?.files ?? []}
                    folders={currentFolder?.folders ?? []}
                    loading={folderStore.isLoading}
                    isCurrentFolderReady={folderStore.isCurrentFolderReady}
                    onLoadMore={() => folderStore.fetchMoreFolderContents()}
                    isLoadingMore={
                        folderStore.pagination.offset > 0 &&
                        folderStore.isLoading
                    }
                    hasMore={hasMore}
                    onSortChange={(sort) => folderStore.updateSort(sort)}
                />
            </div>
            <FileUploadPopup />
        </div>
    )
}

const BrowseSection = observer(BrowseSectionComponent)
export default BrowseSection

