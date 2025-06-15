import { Folder } from "@/entities/Folder"
import { id } from "@/utils/id"
import { makeAutoObservable } from "mobx"

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

        makeAutoObservable(this, {
            file: false,
        })
    }

    id: number = id()
    destination: Folder
    file: globalThis.File
    status: FileUploadStatus = FileUploadStatus.InProgress
    progress: number = 0
}

