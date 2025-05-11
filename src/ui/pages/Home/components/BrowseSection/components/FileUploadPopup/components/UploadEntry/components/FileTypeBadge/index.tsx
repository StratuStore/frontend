import styles from "./styles.module.scss"

export type FileTypeBadgeProps = {
    fileType: string
}

export default function FileTypeBadge({ fileType }: FileTypeBadgeProps) {
    return (
        <div className={styles.fileTypeBadge}>
            {fileType.toLocaleUpperCase()}
        </div>
    )
}

