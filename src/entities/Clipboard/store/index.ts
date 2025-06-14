import { Folder } from "@/entities/Folder"
import { File } from "@/entities/File"
import { makeAutoObservable } from "mobx"
import { ClipboardAction } from "@/entities/Clipboard/store/types"
import { folderStore } from "@/entities/Folder/store"
import { folderService } from "@/entities/Folder/api"
import { fileService } from "@/entities/File/api"
import { MoveFileDto } from "@/entities/File/dto/MoveFileDto"
import toast from "react-hot-toast"
import { fileStore } from "@/entities/File/store"
import i18next from "i18next"

export const t = i18next.t.bind(i18next)

export class ClipboardStore {
    constructor() {
        makeAutoObservable(this)
    }

    file: File | null = null
    folder: Folder | null = null
    clipboardAction: ClipboardAction | null = null
    isActionLoading: boolean = false
    error: string | null = null

    setClipboardAction(action: ClipboardAction | null) {
        this.clipboardAction = action
    }

    setFile(file: File | null) {
        this.file = file
    }

    setFolder(folder: Folder | null) {
        this.folder = folder
    }

    setClipboardActionLoading(isLoading: boolean) {
        this.isActionLoading = isLoading
    }

    getItem() {
        if (this.file) {
            return this.file
        }

        if (this.folder) {
            return this.folder
        }

        return null
    }

    setItem(item: File | Folder) {
        if (item.constructor === File) {
            this.setFile(item as File)
            this.setFolder(null)
            fileStore.clearSelectedFiles()
        } else {
            this.setFolder(item as Folder)
            this.setFile(null)
            folderStore.clearSelectedFolders()
        }

        toast.success(t("toast.clipboard.itemAdded", { ns: "common" }))
    }

    copyToClipboard(item: File | Folder) {
        this.setItem(item)
        this.setClipboardAction(ClipboardAction.Copy)
    }

    cutToClipboard(item: File | Folder) {
        this.setItem(item)
        this.setClipboardAction(ClipboardAction.Cut)
    }

    async paste() {
        await this.cut()

        this.setClipboardAction(null)
        this.setFile(null)
        this.setFolder(null)
        folderStore.refreshFolderContents()
    }

    async cut() {
        if (this.file) {
            await this.cutFile()
        } else if (this.folder) {
            await this.cutFolder()
        }
    }

    async cutFolder() {
        const destinationFolder = folderStore.currentFolder

        if (!this.folder || !destinationFolder) {
            return
        }

        const dto = new MoveFileDto(this.folder.id, destinationFolder.id)

        try {
            this.setClipboardActionLoading(true)
            folderService.move(dto)
            toast.error(
                t("toast.clipboard.failedToMoveFolder", { ns: "common" })
            )
        } catch (error) {
            console.log(error)
        } finally {
            this.setClipboardActionLoading(false)
        }
    }

    async cutFile() {
        const destinationFolder = folderStore.currentFolder

        if (!this.file || !destinationFolder) {
            return
        }

        const dto = new MoveFileDto(this.file.id, destinationFolder.id)

        try {
            this.setClipboardActionLoading(true)
            fileService.move(dto)
        } catch (error) {
            console.log(error)
            toast.error(t("toast.clipboard.failedToMoveFile", { ns: "common" }))
        } finally {
            this.setClipboardActionLoading(false)
            fileStore.clearSelectedFiles()
        }
    }
}

export const clipboardStore = new ClipboardStore()

