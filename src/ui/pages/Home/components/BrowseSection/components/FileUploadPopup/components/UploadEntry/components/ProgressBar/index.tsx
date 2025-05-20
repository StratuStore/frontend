import { FileUploadStatus } from "@/entities/FileUpload"
import _ProgressBar from "@ramonak/react-progress-bar"

import styles from "./styles.module.scss"

export type ProgressBarProps = {
    progress: number
    status: FileUploadStatus
}

function getProgressBarColor(status: FileUploadStatus): string {
    switch (status) {
        case FileUploadStatus.Pending:
            return "var(--text-color)"
        case FileUploadStatus.InProgress:
            return "var(--success-color)"
        case FileUploadStatus.Successful:
            return "var(--success-color)"
        case FileUploadStatus.Failed:
            return "var(--error-color)"
        default:
            return "var(--text-color)"
    }
}

export default function ProgressBar({ progress, status }: ProgressBarProps) {
    return (
        <_ProgressBar
            completed={progress}
            labelClassName={styles.label}
            height="15px"
            bgColor={getProgressBarColor(status)}
        />
    )
}

