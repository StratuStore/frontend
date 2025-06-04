import ReactPlayer from "react-player"
import styles from "./styles.module.scss"
import { File } from "@/entities/File"

export type AudioPreviewProps = {
    file: File
}

export default function AudioPreview({ file }: AudioPreviewProps) {
    return (
        <div className={styles.audioPreviewContainer}>
            <ReactPlayer url={file.getUrl()} controls playing={false} />
        </div>
    )
}

