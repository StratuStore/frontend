import { FileUploadHandlers } from "./types"
import { fileService } from "@/entities/File/api"

class FileSystemService {
    async uploadFile(file: globalThis.File, handlers: FileUploadHandlers) {
        const xhr = this.prepareRequest(handlers)
        const connectionId = await fileService.openConnection(file.name)

        xhr.open(
            "POST",
            `${
                import.meta.env.VITE_FS_MOCK_BASE_URL
            }/files/write?connectionID=${connectionId}`,
            true
        )

        file.arrayBuffer().then((buffer) => {
            xhr.send(buffer)
        })

        return xhr
    }

    private prepareRequest(handlers: FileUploadHandlers) {
        const { onProgress, onSuccess, onError } = handlers

        const xhr = new XMLHttpRequest()

        xhr.upload.addEventListener("progress", (e: ProgressEvent): void => {
            if (e.lengthComputable) {
                const percentComplete: number = Math.round(
                    (e.loaded / e.total) * 100
                )

                onProgress(percentComplete)
            }
        })

        xhr.addEventListener(
            "error",
            (event: ProgressEvent<EventTarget>): void => {
                console.error("Upload error:", event)

                onError(new Error("Upload failed"))
            }
        )

        xhr.addEventListener("load", (): void => {
            if (xhr.status >= 200 && xhr.status < 300) {
                onSuccess()
            } else {
                onError(new Error(`Upload failed with status: ${xhr.status}`))
            }
        })

        return xhr
    }
}

export const fileSystemService = new FileSystemService()

