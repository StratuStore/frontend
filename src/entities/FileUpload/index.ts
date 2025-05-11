import { Folder } from "@/entities/Folder"
import { id } from "@/utils/id"

export enum FileUploadStatus {
    Pending = "pending",
    InProgress = "inProgress",
    Successful = "successful",
    Failed = "failed",
    Cancelled = "cancelled",
}

export class FileUpload {
    constructor(destination: Folder, file: globalThis.File) {
        this.destination = destination
        this.file = file
    }

    id: number = id()
    destination: Folder
    file: globalThis.File
    status: FileUploadStatus = FileUploadStatus.Pending
    progress: number = 0
    error: string | null = null
}

