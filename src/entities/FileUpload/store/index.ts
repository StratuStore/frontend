import { makeAutoObservable } from "mobx"
import { FileUpload, FileUploadStatus } from "@/entities/FileUpload"
import { Folder } from "@/entities/Folder"

class FileUploadStore {
    constructor() {
        makeAutoObservable(this)
    }

    items: FileUpload[] = []
    shouldShowFileUploadPopup = false

    get uploadCount() {
        return this.items.length
    }

    get errorUploadConut() {
        return this.items.filter(
            (item) => item.status === FileUploadStatus.Failed
        ).length
    }

    get hasErrorUploads() {
        return this.items.some(
            (item) => item.status === FileUploadStatus.Failed
        )
    }

    get allUploadsSuccessful() {
        return this.items.every(
            (item) => item.status === FileUploadStatus.Successful
        )
    }

    get allUploadsResolved() {
        return this.items.every(
            (item) =>
                item.status === FileUploadStatus.Successful ||
                item.status === FileUploadStatus.Failed
        )
    }

    addFileUpload(folder: Folder, file: globalThis.File) {
        const fileUpload = new FileUpload(folder, file)
        fileUpload.status = FileUploadStatus.Failed

        this.items.push(fileUpload)
        this.shouldShowFileUploadPopup = true
    }

    updateFileUpload(id: number, fileUpload: Partial<FileUpload>) {
        const index = this.items.findIndex((item) => item.id === id)

        if (index !== -1) {
            this.items[index] = { ...this.items[index], ...fileUpload }
        }
    }

    closeFileUploadPopup() {
        this.shouldShowFileUploadPopup = false
        this.items = []
    }
}

export const fileUploadStore = new FileUploadStore()

