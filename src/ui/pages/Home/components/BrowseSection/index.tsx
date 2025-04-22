import Breadcrumbs from "@/ui/shared/Breadcrumbs"
import styles from "./styles.module.scss"
import FolderContentsTable from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable"
import { observer } from "mobx-react-lite"
import { fileStore } from "@/entities/File/store"
import { folderStore } from "@/entities/Folder/store"
import { useTranslation } from "react-i18next"

function BrowseSectionComponent() {
    const { t } = useTranslation("home")

    return (
        <>
            <div className={styles.headerWrapper}>
                <h2 className={styles.header}>{t("browseSection.title")}</h2>
            </div>
            <div className={styles.breadcrumbsWrapper}>
                <Breadcrumbs items={["Home", "Browse"]} />
            </div>
            <div className={styles.contentsTableWrapper}>
                <FolderContentsTable
                    files={fileStore.files}
                    folders={folderStore.folders}
                />
            </div>
        </>
    )
}

const BrowseSection = observer(BrowseSectionComponent)
export default BrowseSection

