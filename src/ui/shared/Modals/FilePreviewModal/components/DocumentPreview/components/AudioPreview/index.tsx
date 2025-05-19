import ReactPlayer from "react-player"
import styles from "./styles.module.scss"

export type AudioPreviewProps = {
    uri: string
}

export default function AudioPreview({ uri }: AudioPreviewProps) {
    return (
        <div className={styles.audioPreviewContainer}>
            <ReactPlayer url={uri} controls playing={false} />
        </div>
    )
}

