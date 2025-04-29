import { fileUploadStore } from "@/entities/FileUpload/store"
import styles from "./styles.module.scss"
import UploadEntry from "@/ui/pages/Home/components/BrowseSection/components/FileUploadPopup/components/UploadEntry"
import { observer } from "mobx-react-lite"

function ContentComponent() {
    const uploadEntries = fileUploadStore.items

    return (
        <div className={styles.content}>
            {uploadEntries.map((fileUpload) => (
                <UploadEntry
                    fileUpload={fileUpload}
                    key={fileUpload.file.name}
                />
            ))}
        </div>
    )
}

const Content = observer(ContentComponent)
export default Content

