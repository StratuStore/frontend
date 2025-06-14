import VideoPreview from "./components/VideoPreview"
import ImagePreview from "./components/ImagePreview"
import { FC } from "react"
import AudioPreview from "./components/AudioPreview"
import { File } from "@/entities/File"
import { observer } from "mobx-react-lite"
import NoPreview from "./components/NoPreview"

export type DocumentPreviewProps = {
    file: File
}

type PreviewComponentProps = {
    file: File
}

function resolvePreviewComponent(file: File): FC<PreviewComponentProps> | null {
    if (["mp4", "webm"].includes(file.extension)) {
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
        return <NoPreview file={file} />
    }

    return <PreviewComponent file={file} />
}

const DocumentPreview = observer(DocumentPreviewComponent)
export default DocumentPreview

