import VideoPreview from "./components/VideoPreview"
import ImagePreview from "./components/ImagePreview"
import { FC } from "react"
import AudioPreview from "./components/AudioPreview"
import { File } from "@/entities/File"
import { observer } from "mobx-react-lite"

export type DocumentPreviewProps = {
    file: File
}

type PreviewComponentProps = {
    file: File
}

function resolvePreviewComponent(file: File): FC<PreviewComponentProps> | null {
    if (file.extension === "mp4") {
        return VideoPreview
    } else if (["jpg", "jpeg", "png", "gif"].includes(file.extension)) {
        return ImagePreview
    } else if (["mp3"].includes(file.extension)) {
        return AudioPreview
    }

    return null
}

function DocumentPreviewComponent({ file }: DocumentPreviewProps) {
    const PreviewComponent = resolvePreviewComponent(file)

    if (!PreviewComponent) {
        return <p>Unsupported file type</p>
    }

    return <PreviewComponent file={file} />
}

const DocumentPreview = observer(DocumentPreviewComponent)
export default DocumentPreview

