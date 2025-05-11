import styles from "./styles.module.scss"
import Header from "./components/Header"
import Content from "./components/Content"
import { useState } from "react"
import clsx from "clsx"
import { fileUploadStore } from "@/entities/FileUpload/store"
import { observer } from "mobx-react-lite"

function FileUploadPopupComponent() {
    const [isExpanded, setIsExpanded] = useState<boolean>(true)

    const handleExpand = () => {
        setIsExpanded((prev) => !prev)
    }

    return (
        <div
            className={clsx(styles.fileUploadPopup, {
                [styles.expanded]: isExpanded,
                [styles.visible]: fileUploadStore.shouldShowFileUploadPopup,
            })}
        >
            <Header isExpanded={isExpanded} onExpand={handleExpand} />

            <div className={styles.content}>
                <Content />
            </div>
        </div>
    )
}

const FileUploadPopup = observer(FileUploadPopupComponent)
export default FileUploadPopup

