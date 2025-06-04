import { File } from "@/entities/File"
import { FileUploadHandlers } from "./types"

class FileSystemService {
    async uploadFile(
        file: globalThis.File,
        metadata: File,
        handlers: FileUploadHandlers
    ) {
        const xhr = this.prepareRequest(handlers)

        xhr.open(
            "POST",
            `${metadata.host}/files/write?connectionID=${metadata.connectionId}`,
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

