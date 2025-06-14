import { autorun, makeAutoObservable } from "mobx"
import { File } from ".."
import { fileUploadStore } from "@/entities/FileUpload/store"
import { Folder } from "@/entities/Folder"
import { FileModalAction } from "@/entities/File/store/types"
import { RenameFileDto } from "@/entities/File/dto/RenameFileDto"
import { folderStore } from "@/entities/Folder/store"
import { fileService } from "@/entities/File/api"
import toast from "react-hot-toast"
import i18next from "i18next"

export const t = i18next.t.bind(i18next)

class FileStore {
    constructor() {
        makeAutoObservable(this)
    }

    selectedFiles: File[] = []

    uploadFolder: Folder | null = null
    fileUploadInput: HTMLInputElement | null = null

    modalAction: FileModalAction | null = null
    isActionLoading: boolean = false

    isDocumentPreviewLoading: boolean = false
    isUpdatingFileAccess: boolean = false

    sharedFile: File | null = null
    isSharedFileLoading: boolean = false

    isAccessSettingsModalOpen: boolean = false

    setUploadFolder(folder: Folder | null) {
        this.uploadFolder = folder
    }

    setModalAction(modalAction: FileModalAction | null) {
        this.modalAction = modalAction
    }

    setIsActionLoading(isActionLoading: boolean) {
        this.isActionLoading = isActionLoading
    }

    selectFile(file: File) {
        const isSelected = this.selectedFiles.some(
            (selectedFile) => selectedFile.id === file.id
        )

        if (!isSelected) {
            this.selectedFiles = [file]
            return
        }

        this.selectedFiles = this.selectedFiles.filter(
            (selectedFile) => selectedFile.id !== file.id
        )
    }

    forceSelectFile(file: File) {
        this.selectedFiles = [file]
        return
    }

    deselectFile(file: File) {
        const index = this.selectedFiles.findIndex(
            (selectedFile) => selectedFile.id === file.id
        )

        if (index !== -1) {
            this.selectedFiles.splice(index, 1)
        }
    }

    clearSelectedFiles() {
        this.selectedFiles = []
    }

    mountFileInput() {
        const fileInput = document.createElement("input")
        fileInput.type = "file"
        fileInput.style.display = "none"

        document.body.appendChild(fileInput)

        this.fileUploadInput = fileInput

        fileInput.addEventListener("change", (event) => {
            const input = event.target as HTMLInputElement
            const files = input.files

            if (!files || files.length === 0 || this.uploadFolder === null) {
                return
            }

            Array.from(files).forEach((file) => {
                fileUploadStore.addFileUpload(this.uploadFolder!, file)
            })

            input.value = ""
        })

        return fileInput
    }

    startFileUpload(folder: Folder) {
        this.setUploadFolder(folder)
        this.fileUploadInput?.click()
    }

    showRenameFileModal() {
        this.setModalAction(FileModalAction.Rename)
    }

    showDeleteFileModal() {
        this.setModalAction(FileModalAction.Delete)
    }

    closeActionModal() {
        this.setModalAction(null)
    }

    setIsUpdatingFileAccess(isUpdating: boolean) {
        this.isUpdatingFileAccess = isUpdating
    }

    setSharedFile(file: File | null) {
        this.sharedFile = file
    }

    setIsSharedFileLoading(isLoading: boolean) {
        this.isSharedFileLoading = isLoading
    }

    setIsAccessSettingsModalOpen(isOpen: boolean) {
        this.isAccessSettingsModalOpen = isOpen
    }

    async renameFile(fileId: string, newName: string) {
        const dto = new RenameFileDto(fileId, newName)

        try {
            fileStore.setIsActionLoading(true)
            await fileService.rename(dto)

            await folderStore.refreshFolderContents()
            this.closeActionModal()
            await folderStore.getPinnedFiles()
        } catch (error) {
            console.error("Failed to rename file:", error)
            toast.error(t("toast.file.failedToRename", { ns: "common" }))
        } finally {
            fileStore.setIsActionLoading(false)
            this.closeActionModal()
        }
    }

    async deleteFile(fileId: string) {
        try {
            fileStore.setIsActionLoading(true)
            await fileService.delete(fileId)

            await folderStore.refreshFolderContents()
            this.closeActionModal()
            await folderStore.getPinnedFiles()
        } catch (error) {
            console.error("Failed to delete file:", error)
            toast.error(t("toast.file.failedToDelete", { ns: "common" }))
        } finally {
            fileStore.setIsActionLoading(false)
            this.closeActionModal()
            toast.success(t("toast.file.deleted", { ns: "common" }))
        }
    }

    async downloadFile(file: File) {
        if (!file) {
            return
        }

        try {
            if (!file.host || !file.connectionId) {
                const { connectionId, host } = await fileService.openConnection(
                    file.id
                )

                file.host = host
                file.connectionId = connectionId
            }

            const link = document.createElement("a")

            link.href = file.getUrl()
            link.download = file.name
            link.target = "_blank"

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error("Failed to download file:", error)
            toast.error(t("toast.file.failedToDownload", { ns: "common" }))
        }
    }

    async loadDocumentPreview(file: File) {
        this.isDocumentPreviewLoading = true

        try {
            const { connectionId, host } = await fileService.openConnection(
                file.id
            )

            file.host = host
            file.connectionId = connectionId
        } catch (error) {
            console.error("Failed to load document preview:", error)
            toast.error(
                t("toast.file.failedToLoadDocumentPreview", { ns: "common" })
            )
        } finally {
            this.isDocumentPreviewLoading = false
        }
    }

    async closeConnection(file: File) {
        this.isDocumentPreviewLoading = true

        try {
            await fileService.closeConnection(file)
        } catch (error) {
            console.error("Failed to close file connection:", error)
        } finally {
            file.host = undefined
            file.connectionId = undefined

            this.isDocumentPreviewLoading = false
        }
    }

    async updateAccessLevel(fileId: string, isPublic: boolean) {
        this.setIsUpdatingFileAccess(true)

        try {
            await fileService.updateAccessLevel(fileId, isPublic)
            toast.success(t("toast.file.accessLevelUpdated", { ns: "common" }))
        } catch (error) {
            console.error("Failed to update file access level:", error)
            toast.error(
                t("toast.file.failedToUpdateAccessLevel", { ns: "common" })
            )
        } finally {
            this.setIsUpdatingFileAccess(false)
        }
    }

    async loadSharedFile(id: string) {
        this.setIsSharedFileLoading(true)

        try {
            const file = await fileService.getById(id)
            this.setSharedFile(file)
        } catch (error) {
            console.error("Failed to load shared file:", error)
            toast.error(t("toast.file.sharedFileUnavailable", { ns: "common" }))
            throw error
        } finally {
            this.setIsSharedFileLoading(false)
        }
    }

    async togglePinned(file: File) {
        try {
            file.starred = !file.starred
            await fileService.togglePinned(file.id)

            await folderStore.getPinnedFiles()
        } catch (error) {
            console.error("Failed to toggle pinned status:", error)
            toast.error(
                t("toast.file.failedToUpdateStarredStatus", { ns: "common" })
            )
        }
    }
}

export const fileStore = new FileStore()

autorun(() => {
    fileStore.mountFileInput()
})

