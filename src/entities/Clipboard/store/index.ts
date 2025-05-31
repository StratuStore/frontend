import { Folder } from "@/entities/Folder"
import { File } from "@/entities/File"
import { makeAutoObservable } from "mobx"
import { ClipboardAction } from "@/entities/Clipboard/store/types"
import { folderStore } from "@/entities/Folder/store"
import { CopyFolderDto } from "@/entities/Folder/dto/CopyFolderDto"
import { folderService } from "@/entities/Folder/api"
import { CopyFileDto } from "@/entities/File/dto/CopyFileDto"
import { fileService } from "@/entities/File/api"
import { MoveFileDto } from "@/entities/File/dto/MoveFileDto"
import toast from "react-hot-toast"
import { fileStore } from "@/entities/File/store"

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
        const clone = structuredClone(item)

        if (clone.constructor === File) {
            this.setFile(clone as File)
            this.setFolder(null)
            fileStore.clearSelectedFiles()
        } else {
            this.setFolder(clone as Folder)
            this.setFile(null)
            folderStore.clearSelectedFolders()
        }

        toast.success("Item added to clipboard")
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
        if (this.clipboardAction === ClipboardAction.Copy) {
            await this.copy()
        } else if (this.clipboardAction === ClipboardAction.Cut) {
            await this.cut()
        }

        this.setClipboardAction(null)
        this.setFile(null)
        this.setFolder(null)
        folderStore.refreshFolderContents()
    }

    async copy() {
        if (this.file) {
            await this.copyFile()
        } else if (this.folder) {
            await this.copyFolder()
        }
    }

    async copyFolder() {
        const destinationFolder = folderStore.currentFolder

        if (!this.folder || !destinationFolder) {
            return
        }

        const dto = new CopyFolderDto(this.folder.id, destinationFolder.id)

        try {
            this.setClipboardActionLoading(true)
            folderService.copy(dto)
        } catch (error) {
            console.log(error)
        } finally {
            this.setClipboardActionLoading(false)
        }
    }

    async copyFile() {
        const destinationFolder = folderStore.currentFolder

        if (!this.file || !destinationFolder) {
            return
        }

        const dto = new CopyFileDto(this.file.id, destinationFolder.id)

        try {
            this.setClipboardActionLoading(true)
            fileService.copyFile(dto)
        } catch (error) {
            console.log(error)
        } finally {
            this.setClipboardActionLoading(false)
        }
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
            fileService.moveFile(dto)
        } catch (error) {
            console.log(error)
        } finally {
            this.setClipboardActionLoading(false)
        }
    }
}

export const clipboardStore = new ClipboardStore()

