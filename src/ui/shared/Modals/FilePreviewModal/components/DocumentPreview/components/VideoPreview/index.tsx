import { File } from "@/entities/File"
import ReactPlayer from "react-player"

export type VideoPreviewProps = {
    file: File
}

export default function VideoPreview({ file }: VideoPreviewProps) {
    return (
        <ReactPlayer
            url={file.getUrl()}
            controls
            width="100%"
            height="100%"
            playing={false}
        />
    )
}

