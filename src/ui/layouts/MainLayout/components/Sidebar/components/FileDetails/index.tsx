import { File } from "@/entities/File"
import styles from "./styles.module.scss"

export type FileDetailsProps = {
    file: File
}

export default function FileDetails({ file }: FileDetailsProps) {
    return (
        <div className={styles.fileDetailsWrapper}>
            <div className={styles.header}></div>
            <div className={styles.entry}>
                <p className={styles.entryHeader}></p>
                <p className={styles.entryText}></p>
            </div>
        </div>
    )
}
