import { folderStore } from "@/entities/Folder/store"
import FolderContentsTable from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import styles from "./styles.module.scss"
import { Link, useNavigate } from "react-router"
import NoContent from "./components/NoContent"
import { useTranslation } from "react-i18next"
import { withAuthGuard } from "@/entities/Auth/components/withAuthGuard"

function SearchPageComponent() {
    const files = folderStore.searchResults.files
    const folders = folderStore.searchResults.folders

    const navigate = useNavigate()
    const { t } = useTranslation("search")

    const foldersCount = folders.length
    const filesCount = files.length

    const hasMore =
        foldersCount + filesCount < folderStore.searchPagination.total

    useEffect(() => {
        if (Object.keys(folderStore.search).length === 0) {
            navigate("/")
        }
    }, [navigate])

    return (
        <div className={styles.searchPageWrapper}>
            <div className={styles.headerWrapper}>
                <h2 className={styles.header}>{t("heading")}</h2>
                <Link to="/">{t("backToHomePage")}</Link>
            </div>

            <div className={styles.contentsTableWrapper}>
                {files.length === 0 &&
                folders.length === 0 &&
                !folderStore.isLoading ? (
                    <NoContent />
                ) : (
                    <FolderContentsTable
                        files={files ?? []}
                        folders={folders ?? []}
                        loading={folderStore.isLoading}
                        disableContextMenu
                        isCurrentFolderReady={folderStore.isCurrentFolderReady}
                        onLoadMore={() => folderStore.fetchMoreSearchResults()}
                        isLoadingMore={
                            folderStore.searchPagination.offset > 0 &&
                            folderStore.isLoading
                        }
                        hasMore={hasMore}
                        onSortChange={(sort) =>
                            folderStore.updateSort(sort, true)
                        }
                    />
                )}
            </div>
        </div>
    )
}

const SearchPage = withAuthGuard(observer(SearchPageComponent))
export default SearchPage

