import VideoPreview from "./components/VideoPreview"
import ImagePreview from "./components/ImagePreview"
import { FC } from "react"
import AudioPreview from "./components/AudioPreview"

export type DocumentPreviewProps = {
    uri: string
    extension: string
}

type PreviewComponentProps = {
    uri: string
}

function resolvePreviewComponent(
    fileExtension: string
): FC<PreviewComponentProps> | null {
    if (fileExtension === "mp4") {
        return VideoPreview
    } else if (["jpg", "jpeg", "png", "gif"].includes(fileExtension || "")) {
        return ImagePreview
    } else if (["mp3"].includes(fileExtension || "")) {
        return AudioPreview
    }

    return null
}

export default function DocumentPreview({
    uri,
    extension,
}: DocumentPreviewProps) {
    const PreviewComponent = resolvePreviewComponent(extension)

    if (!PreviewComponent) {
        return <p>Unsupported file type</p>
    }

    return <PreviewComponent uri={uri} />
}

