import { autorun, makeAutoObservable } from "mobx"
import { File } from ".."
import { fileUploadStore } from "@/entities/FileUpload/store"
import { Folder } from "@/entities/Folder"
import { FileModalAction } from "@/entities/File/store/types"
import { RenameFileDto } from "@/entities/File/dto/RenameFileDto"
import { folderStore } from "@/entities/Folder/store"
import { fileService } from "@/entities/File/api"

class FileStore {
    constructor() {
        makeAutoObservable(this)
    }

    selectedFiles: File[] = []

    uploadFolder: Folder | null = null
    fileUploadInput: HTMLInputElement | null = null

    modalAction: FileModalAction | null = null
    isActionLoading: boolean = false

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
        // const isSelected = this.selectedFiles.some(
        //     (selectedFile) => selectedFile.id === file.id
        // )

        // if (!isSelected) {
        //     this.selectedFiles.push(file)
        // }

        this.selectedFiles = [file]
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
        this.selectedFiles.length = 0
    }

    mountFileInput() {
        const fileInput = document.createElement("input")
        fileInput.type = "file"
        fileInput.accept = ".pdf, .jpg, .js, .pptx, .xlsx, .zip"
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
        this.setUploadFolder(null)
    }

    showRenameFileModal() {
        this.setModalAction(FileModalAction.Rename)
    }

    closeActionModal() {
        this.setModalAction(null)
    }

    async renameFile(fileId: string, newName: string) {
        const dto = new RenameFileDto(fileId, newName)

        try {
            fileStore.setIsActionLoading(true)
            await fileService.renameFile(dto)

            folderStore.fetchFolderContents()
        } catch (error) {
            console.log(error)
        } finally {
            fileStore.setIsActionLoading(false)
            this.closeActionModal()
        }
    }

    async deleteFile(fileId: string) {
        try {
            fileStore.setIsActionLoading(true)
            await fileService.deleteFile(fileId)

            folderStore.fetchFolderContents()
        } catch (error) {
            console.log(error)
        } finally {
            fileStore.setIsActionLoading(true)
        }
    }
}

export const fileStore = new FileStore()

autorun(() => {
    fileStore.mountFileInput()
})

