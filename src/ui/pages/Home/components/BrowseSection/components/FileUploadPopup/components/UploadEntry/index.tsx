import { FileUpload, FileUploadStatus } from "@/entities/FileUpload"
import styles from "./styles.module.scss"
import UploadStatusIcon from "@/ui/pages/Home/components/BrowseSection/components/FileUploadPopup/components/UploadEntry/components/UploadStatusIcon"
import Button from "@/ui/shared/Button"
import FileTypeBadge from "@/ui/pages/Home/components/BrowseSection/components/FileUploadPopup/components/UploadEntry/components/FileTypeBadge"
import { useTranslation } from "react-i18next"
import ProgressBar from "@/ui/pages/Home/components/BrowseSection/components/FileUploadPopup/components/UploadEntry/components/ProgressBar"

export type UploadEntryProps = {
    fileUpload: FileUpload
}

export default function UploadEntry({ fileUpload }: UploadEntryProps) {
    const file = fileUpload.file
    // const fileType = file.name.split(".").pop() || ""

    // const { t } = useTranslation("home")

    return (
        <div className={styles.uploadEntry}>
            <div className={styles.content}>
                <div className={styles.uploadInfo}>
                    <div className={styles.firstRow}>
                        <UploadStatusIcon
                            status={FileUploadStatus.Successful}
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
                    progress={100}
                    status={FileUploadStatus.Successful}
                />
            </div>
        </div>
    )
}

