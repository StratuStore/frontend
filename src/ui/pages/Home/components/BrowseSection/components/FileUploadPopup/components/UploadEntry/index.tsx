import { FileUpload } from "@/entities/FileUpload"
import styles from "./styles.module.scss"
import UploadStatusIcon from "@/ui/pages/Home/components/BrowseSection/components/FileUploadPopup/components/UploadEntry/components/UploadStatusIcon"
import ProgressBar from "@/ui/pages/Home/components/BrowseSection/components/FileUploadPopup/components/UploadEntry/components/ProgressBar"
import { observer } from "mobx-react-lite"

export type UploadEntryProps = {
    fileUpload: FileUpload
}

function UploadEntryComponent({ fileUpload }: UploadEntryProps) {
    const file = fileUpload.file

    return (
        <div className={styles.uploadEntry}>
            <div className={styles.content}>
                <div className={styles.uploadInfo}>
                    <div className={styles.firstRow}>
                        <UploadStatusIcon
                            status={fileUpload.status}
                            iconProps={{ width: "20px", height: "20px" }}
                        />
                        <div className={styles.filename}>{file.name}</div>
                    </div>

                    {/* <div className={styles.secondRow}>
                        <FileTypeBadge fileType={fileType} />
                        <div className={styles.destination}>
                            {t("fileUploadPopup.destination", {
                                destination: fileUpload.destination.path.at(-1),
                            })}
                        </div>
                    </div> */}
                </div>

                {/* <Button variant="outline" size="small">
                    Copy link
                </Button> */}
            </div>

            <div className={styles.progressBarWrapper}>
                <ProgressBar
                    progress={fileUpload.progress}
                    status={fileUpload.status}
                />
            </div>
        </div>
    )
}

const UploadEntry = observer(UploadEntryComponent)
export default UploadEntry

