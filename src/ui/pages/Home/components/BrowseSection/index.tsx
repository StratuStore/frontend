import Breadcrumbs from "@/ui/shared/Breadcrumbs"
import styles from "./styles.module.scss"
import FolderContentsTable from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable"
import { observer } from "mobx-react-lite"
import { fileStore } from "@/entities/File/store"
import { folderStore } from "@/entities/Folder/store"

function BrowseSectionComponent() {
    return (
        <>
            <div className={styles.headerWrapper}>
                <h2 className={styles.header}>Browse</h2>
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
