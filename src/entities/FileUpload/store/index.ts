import { makeAutoObservable } from "mobx"
import { FileUpload, FileUploadStatus } from "@/entities/FileUpload"
import { Folder } from "@/entities/Folder"
import { fileService } from "@/entities/File/api"
import { CreateFileDto } from "@/entities/File/dto/CreateFileDto"
import toast from "react-hot-toast"
import { folderStore } from "@/entities/Folder/store"
import { fileSystemService } from "@/entities/FileUpload/api"
import i18next from "i18next"

const t = i18next.t.bind(i18next)

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

    async addFileUpload(folder: Folder, file: globalThis.File) {
        try {
            const dto = new CreateFileDto(
                file.name,
                folder.id,
                file.size,
                file.name.split(".").pop() || ""
            )

            const metadata = await fileService.create(dto)

            if (!metadata.connectionId || !metadata.host) {
                throw new Error("File metadata is missing connectionId or host")
            }

            const fileUpload = new FileUpload(folder, file)

            fileSystemService.uploadFile(fileUpload.file, metadata, {
                onProgress: (progress: number) => {
                    fileUpload.progress = progress
                },

                onSuccess: () => {
                    fileUpload.status = FileUploadStatus.Successful
                    fileUpload.progress = 100
                    fileUpload.error = null

                    folderStore.refreshFolderContents()
                },

                onError: (error: Error) => {
                    fileUpload.status = FileUploadStatus.Failed
                    fileUpload.error = error.message
                },
            })

            this.items.push(fileUpload)
            this.shouldShowFileUploadPopup = true
        } catch (error) {
            console.error("Failed to add file upload:", error)
            toast.error(
                t("toast.fileUpload.startUploadFailed", { ns: "common" })
            )
        }
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

