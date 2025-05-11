import { FileUploadStatus } from "@/entities/FileUpload"
import _ProgressBar from "@ramonak/react-progress-bar"

import styles from "./styles.module.scss"

export type ProgressBarProps = {
    progress: number
    status: FileUploadStatus
}

export default function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <_ProgressBar
            completed={progress}
            labelClassName={styles.label}
            // className={styles.wrapper}
            // barContainerClassName={styles.container}
            // completedClassName={styles.barCompleted}
            height="15px"
            bgColor="#4CAF50"
        />
    )
}

