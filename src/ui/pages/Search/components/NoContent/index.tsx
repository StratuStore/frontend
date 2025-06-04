import styles from "./styles.module.scss"
import { folderStore } from "@/entities/Folder/store"
import { observer } from "mobx-react-lite"
import { fileStore } from "@/entities/File/store"
import Button from "@/ui/shared/Button"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

function NoContentComponent() {
    const folder = folderStore.currentFolder
    const { t } = useTranslation("search")
    const navigate = useNavigate()

    if (!folder) {
        return null
    }

    return (
        <div
            className={styles.noContentWrapper}
            onClick={() => fileStore.startFileUpload(folder)}
        >
            <p className={styles.caption}>{t("noSearchResults.title")}</p>
            <p className={styles.caption}>{t("noSearchResults.description")}</p>
            <div className={styles.buttonWrapper}>
                <Button
                    className={styles.newFolderButton}
                    onClick={(e) => {
                        e.stopPropagation()
                        navigate("/")
                    }}
                >
                    {t("noSearchResults.backToHomePage")}
                </Button>
            </div>
        </div>
    )
}

const NoContent = observer(NoContentComponent)
export default NoContent

