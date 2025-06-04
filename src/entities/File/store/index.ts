import { autorun, makeAutoObservable } from "mobx"
import { File } from ".."
import { fileUploadStore } from "@/entities/FileUpload/store"
import { Folder } from "@/entities/Folder"
import { FileModalAction } from "@/entities/File/store/types"
import { RenameFileDto } from "@/entities/File/dto/RenameFileDto"
import { folderStore } from "@/entities/Folder/store"
import { fileService } from "@/entities/File/api"
import toast from "react-hot-toast"

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

    async renameFile(fileId: string, newName: string) {
        const dto = new RenameFileDto(fileId, newName)

        try {
            fileStore.setIsActionLoading(true)
            await fileService.rename(dto)

            await folderStore.refreshFolderContents()
        } catch (error) {
            console.error("Failed to rename file:", error)
            toast.error("Failed to rename file. Please try again.")
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
        } catch (error) {
            console.error("Failed to delete file:", error)
            toast.error("Failed to rename file. Please try again.")
        } finally {
            fileStore.setIsActionLoading(false)
            this.closeActionModal()
            toast.success("File deleted successfully")
        }
    }

    async downloadFile() {
        const file = this.selectedFiles[0]

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
            toast.error("Failed to download file. Please try again.")
        }
    }

    async loadDocumentPreview() {
        this.isDocumentPreviewLoading = true
        const file = this.selectedFiles[0]

        try {
            const { connectionId, host } = await fileService.openConnection(
                file.id
            )

            file.host = host
            file.connectionId = connectionId
        } catch (error) {
            console.error("Failed to load document preview:", error)
            toast.error("Failed to load document preview. Please try again.")
        } finally {
            this.isDocumentPreviewLoading = false
        }
    }

    async closeConnection() {
        this.isDocumentPreviewLoading = true
        const file = this.selectedFiles[0]

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
}

export const fileStore = new FileStore()

autorun(() => {
    fileStore.mountFileInput()
})

