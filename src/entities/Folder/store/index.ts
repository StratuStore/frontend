import { makeAutoObservable } from "mobx"
import { Folder } from ".."
import { folderService } from "@/entities/Folder/api"
import { CreateFolderDto } from "../dto/CreateFolderDto"
import { FolderModalAction } from "@/entities/Folder/store/types"
import { RenameFolderDto } from "@/entities/Folder/dto/RenameFolderDto"
import { DeleteFolderDto } from "@/entities/Folder/dto/DeleteFolderDto"
import { GetFolderDto } from "@/entities/Folder/dto/GetFolderDto"
import toast from "react-hot-toast"

class FolderStore {
    constructor() {
        makeAutoObservable(this)
    }

    currentFolderId: string | null = null
    currentFolder: Folder | null = null
    isLoading: boolean = false
    isCurrentFolderReady: boolean = false
    pagination: {
        limit: number
        offset: number
        total: number
    } = {
        limit: 50,
        offset: 0,
        total: -1,
    }

    modalAction: FolderModalAction | null = null
    isActionLoading: boolean = false

    selectedFolders: Folder[] = []

    setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading
    }

    setIsCurrentFolderReady(isCurrentFolderReady: boolean) {
        this.isCurrentFolderReady = isCurrentFolderReady
    }

    setCurrentFolderId(currentFolderId: string) {
        this.currentFolderId = currentFolderId
    }

    setCurrentFolder(currentFolder: Folder | null) {
        this.currentFolder = currentFolder
    }

    setModalAction(modalAction: FolderModalAction | null) {
        this.modalAction = modalAction
    }

    setActionLoading(isActionLoading: boolean) {
        this.isActionLoading = isActionLoading
    }

    selectFolder(folder: Folder) {
        const isSelected = this.selectedFolders.some(
            (selectedFolder) => selectedFolder.id === folder.id
        )

        if (!isSelected) {
            this.selectedFolders = [folder]
            return
        }

        this.selectedFolders = this.selectedFolders.filter(
            (selectedFolder) => selectedFolder.id !== folder.id
        )
    }

    deselectFolder(folder: Folder) {
        const index = this.selectedFolders.findIndex(
            (selectedFolder) => selectedFolder.id === folder.id
        )

        if (index !== -1) {
            this.selectedFolders.splice(index, 1)
        }
    }

    clearSelectedFolders() {
        this.selectedFolders = []
    }

    navigateToFolder(folder: Folder) {
        this.currentFolder = folder
        this.currentFolderId = folder.id
        this.isCurrentFolderReady = false
    }

    async getRootFolder() {
        try {
            this.setIsLoading(true)
            const rootFolder = await folderService.getRootFolder()

            const pathSegment = {
                name: "root",
                id: rootFolder.id,
            }
            rootFolder.path.push(pathSegment)

            this.currentFolder = rootFolder
            this.currentFolderId = rootFolder.id
        } catch (error) {
            console.error("Error fetching root folder:", error)
            toast.error("Failed to load folder. Please try again.")
            this.currentFolder = null
            this.currentFolderId = null
        } finally {
            this.setIsLoading(false)
            this.setIsCurrentFolderReady(true)
        }
    }

    async getFolderById(id: string) {
        try {
            this.setIsLoading(true)
            const folder = await folderService.getById(id)

            const pathSegment = {
                name: folder.name,
                id: folder.id,
            }
            folder.path.push(pathSegment)

            this.currentFolder = folder
            this.currentFolderId = folder.id
        } catch (error) {
            console.error("Error fetching folder:", error)
            toast.error("Failed to load folder. Please try again.")
            this.currentFolder = null
            this.currentFolderId = null
        } finally {
            this.setIsLoading(false)
            this.setIsCurrentFolderReady(true)
        }
    }

    async fetchMoreFolderContents() {
        if (!this.currentFolder) {
            return
        }

        this.setIsLoading(true)
        const dto = new GetFolderDto(
            this.currentFolder.id,
            this.pagination.offset,
            this.pagination.limit
        )

        try {
            const contents = await folderService.getFolderContents(dto)
            const { files, folders, foldersCount, filesCount } = contents

            this.currentFolder.files = [...this.currentFolder.files, ...files]
            this.currentFolder.folders = [
                ...this.currentFolder.folders,
                ...folders,
            ]
            this.pagination.total = foldersCount + filesCount
            this.pagination.offset += this.pagination.limit
        } catch (error) {
            console.error("Error fetching more folder contents:", error)
            toast.error("Failed to load more items. Please try again.")
            this.pagination.offset += this.pagination.limit
        } finally {
            this.setIsLoading(false)
        }
    }

    async refreshFolderContents() {
        if (!this.currentFolder) {
            return
        }

        this.pagination.offset = 0
        this.pagination.limit = 50
        this.pagination.total = -1
        this.currentFolder.folders = []
        this.currentFolder.files = []
        this.clearSelectedFolders()

        this.fetchMoreFolderContents()
    }

    showCreateFolderModal() {
        this.setModalAction(FolderModalAction.Create)
    }

    async createFolder(name: string) {
        if (!this.currentFolderId) {
            return
        }

        const dto = new CreateFolderDto(name, this.currentFolderId)

        try {
            this.setActionLoading(true)
            await folderService.create(dto)

            this.refreshFolderContents()
        } catch (error) {
            console.error("Error creating folder:", error)
        } finally {
            this.setActionLoading(false)
            this.closeActionModal()
        }
    }

    showRenameFolderModal() {
        this.setModalAction(FolderModalAction.Rename)
    }

    showDeleteFolderModal() {
        this.setModalAction(FolderModalAction.Delete)
    }

    async renameFolder(id: string, newName: string) {
        const dto = new RenameFolderDto(id, newName)

        try {
            this.setActionLoading(true)
            await folderService.rename(dto)

            this.refreshFolderContents()
        } catch (error) {
            console.error("Error renaming folder:", error)
        } finally {
            this.setActionLoading(false)
            this.closeActionModal()
        }
    }

    async deleteFolder(id: string) {
        const dto = new DeleteFolderDto(id)

        try {
            this.setActionLoading(true)
            await folderService.delete(dto)
            toast.success("Folder deleted successfully.")

            this.refreshFolderContents()
        } catch (error) {
            console.error("Error renaming folder:", error)
            toast.error("Failed to delete folder. Please try again.")
        } finally {
            this.setActionLoading(false)
            this.closeActionModal()
        }
    }

    closeActionModal() {
        this.setModalAction(null)
    }
}

export const folderStore = new FolderStore()

