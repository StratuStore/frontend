import VideoPreview from "./components/VideoPreview"
import ImagePreview from "./components/ImagePreview"
import { FC } from "react"
import AudioPreview from "./components/AudioPreview"

export type DocumentPreviewProps = {
    uri: string
}

type PreviewComponentProps = {
    uri: string
}

function resolvePreviewComponent(
    uri: string
): FC<PreviewComponentProps> | null {
    const fileExtension = uri.split(".").pop()?.toLowerCase()

    if (fileExtension === "mp4") {
        return VideoPreview
    } else if (["jpg", "jpeg", "png", "gif"].includes(fileExtension || "")) {
        return ImagePreview
    } else if (["mp3"].includes(fileExtension || "")) {
        return AudioPreview
    }

    return null
}

export default function DocumentPreview({ uri }: DocumentPreviewProps) {
    const PreviewComponent = resolvePreviewComponent(uri)

    if (!PreviewComponent) {
        return <p>Unsupported file type</p>
    }

    return <PreviewComponent uri={uri} />
}

