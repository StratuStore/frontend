import { makeAutoObservable } from "mobx"
import { FileUpload } from "@/entities/FileUpload"
import { File } from "@/entities/File"
import { Folder } from "@/entities/Folder"

class FileUploadStore {
    constructor() {
        makeAutoObservable(this)
    }

    items: FileUpload[] = []

    get uploadCount() {
        return this.items.length
    }

    addFileUpload(folder: Folder, file: globalThis.File) {
        const fileUpload = new FileUpload(folder, file)
        this.items.push(fileUpload)
    }

    updateFileUpload(id: number, fileUpload: Partial<FileUpload>) {
        const index = this.items.findIndex((item) => item.id === id)

        if (index !== -1) {
            this.items[index] = { ...this.items[index], ...fileUpload }
        }
    }
}

export const fileUploadStore = new FileUploadStore()

