import ReactPlayer from "react-player"

export type VideoPreviewProps = {
    uri: string
}

export default function VideoPreview({ uri }: VideoPreviewProps) {
    return (
        <ReactPlayer
            url={uri}
            controls
            width="100%"
            height="100%"
            playing={false}
        />
    )
}

