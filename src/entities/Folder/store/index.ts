import { makeAutoObservable } from "mobx"
import { Folder } from ".."
import { folderService } from "@/entities/Folder/api"
import { CreateFolderDto } from "../dto/CreateFolderDto"
import { FolderModalAction } from "@/entities/Folder/store/types"
import { RenameFolderDto } from "@/entities/Folder/dto/RenameFolderDto"
import { DeleteFolderDto } from "@/entities/Folder/dto/DeleteFolderDto"

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

    async navigateByPath(path: string[]) {
        this.setIsLoading(true)
        const folder = await folderService.getByPath(path)

        if (!folder) {
            return
        }

        this.navigateToFolder(folder)
        this.setIsLoading(false)
        return folder
    }

    getRootFolder() {
        const rootFolder = folderService.getRootFolder()

        this.currentFolder = rootFolder || null
        this.currentFolderId = rootFolder?.id || null
    }

    async fetchFolderContents() {
        if (!this.currentFolderId) {
            return
        }

        this.setIsLoading(true)

        if (
            !this.currentFolder ||
            this.currentFolder.id !== this.currentFolderId
        ) {
            const currentFolder = await folderService.getById(
                this.currentFolderId
            )

            this.setCurrentFolder(currentFolder || null)
        } else {
            await folderService.getFolderContents(this.currentFolderId)
        }

        this.setIsLoading(false)
        this.setIsCurrentFolderReady(true)
    }

    async fetchMoreFolderContents() {
        if (!this.currentFolder) {
            return
        }

        this.setIsLoading(true)
        this.pagination.offset += this.pagination.limit

        try {
            await folderService.getFolderContents(
                this.currentFolder.id,
                this.pagination.offset,
                this.pagination.limit
            )
        } catch (error) {
            console.error("Error fetching more folder contents:", error)
            this.pagination.offset += this.pagination.limit
        } finally {
            this.setIsLoading(false)
        }
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

            this.fetchFolderContents()
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

    async renameFolder(id: string, newName: string) {
        const dto = new RenameFolderDto(id, newName)

        try {
            this.setActionLoading(true)
            await folderService.rename(dto)

            this.fetchFolderContents()
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
            this.setIsLoading(true)
            await folderService.delete(dto)

            this.fetchFolderContents()
        } catch (error) {
            console.error("Error renaming folder:", error)
        } finally {
            this.setIsLoading(false)
            this.closeActionModal()
        }
    }

    closeActionModal() {
        this.setModalAction(null)
    }
}

export const folderStore = new FolderStore()

