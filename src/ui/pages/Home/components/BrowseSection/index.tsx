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
    const rootFolder = folderStore.rootFolder

    useEffect(() => {
        folderStore.getRootFolder()
    }, [])

    return (
        <>
            <div className={styles.headerWrapper}>
                <h2 className={styles.header}>{t("browseSection.title")}</h2>
            </div>
            <div className={styles.breadcrumbsWrapper}>
                <Breadcrumbs segments={["root"]} />
            </div>
            <div className={styles.contentsTableWrapper}>
                <FolderContentsTable
                    files={rootFolder?.files ?? []}
                    folders={rootFolder?.folders ?? []}
                />
            </div>
            <FileUploadPopup />
        </>
    )
}

const BrowseSection = observer(BrowseSectionComponent)
export default BrowseSection

