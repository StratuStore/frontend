import VideoPreview from "./components/VideoPreview"
import ImagePreview from "./components/ImagePreview"

export type DocumentPreviewProps = {
    uri: string
}

export default function DocumentPreview({ uri }: DocumentPreviewProps) {
    return <ImagePreview uri={uri} />

    // return <VideoPreview uri={uri} />

    return (
        <div>
            <h1>Document Preview</h1>
            <p>This is the document preview component.</p>
        </div>
    )
}

