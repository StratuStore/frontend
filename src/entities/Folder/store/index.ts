import { makeAutoObservable } from "mobx"
import { Folder } from ".."
import { folderService } from "@/entities/Folder/api"

class FolderStore {
    constructor() {
        makeAutoObservable(this)
    }

    rootFolder: Folder | null = null
    currentFolderId: string | null = null
    currentFolder: Folder | null = null
    isLoading: boolean = false
    isCurrentFolderReady: boolean = false

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

    navigateToFolder(folder: Folder) {
        this.currentFolder = folder
        this.currentFolderId = folder.id
    }

    getRootFolder() {
        const rootFolder = folderService.getRootFolder()

        this.rootFolder = rootFolder || null
    }

    async fetchFolderContents() {
        if (!this.currentFolderId) {
            return
        }

        this.setIsLoading(true)

        if (!this.currentFolder) {
            const currentFolder = await folderService.getFolerById(
                this.currentFolderId
            )

            this.setCurrentFolder(currentFolder || null)
        } else {
            await folderService.getIncludedFolders(this.currentFolderId)
        }

        this.setIsLoading(false)
        this.setIsCurrentFolderReady(true)
    }
}

export const folderStore = new FolderStore()

