import { makeAutoObservable } from "mobx"
import { Folder } from ".."
import { folderService } from "@/entities/Folder/api"
import { CreateFolderDto } from "../dto/CreateFolderDto"
import { FolderModalAction } from "@/entities/Folder/store/types"
import { RenameFolderDto } from "@/entities/Folder/dto/RenameFolderDto"
import { DeleteFolderDto } from "@/entities/Folder/dto/DeleteFolderDto"
import { GetFolderDto } from "@/entities/Folder/dto/GetFolderDto"
import toast from "react-hot-toast"
import { SearchDto } from "@/entities/Search/dto/SearchDto"
import { searchService } from "@/entities/Search/api"
import { File } from "@/entities/File"
import { fileStore } from "@/entities/File/store"
import { SortingDirection } from "@/entities/Folder/types/SortingDirection"
import i18next from "i18next"
import { FOLDER_CONTENTS_TABLE_PAGE_SIZE } from "@/entities/Folder/constants"

const t = i18next.t.bind(i18next)

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
        limit: FOLDER_CONTENTS_TABLE_PAGE_SIZE,
        offset: 0,
        total: -1,
    }

    sort: {
        field: string | null
        direction: SortingDirection
    } = {
        field: null,
        direction: SortingDirection.Asc,
    }

    modalAction: FolderModalAction | null = null
    isActionLoading: boolean = false

    selectedFolders: Folder[] = []

    search: SearchDto = {}
    searchResults: {
        folders: Folder[]
        files: File[]
    } = {
        folders: [],
        files: [],
    }
    searchPagination: {
        limit: number
        offset: number
        total: number
    } = {
        limit: FOLDER_CONTENTS_TABLE_PAGE_SIZE,
        offset: 0,
        total: -1,
    }

    sharedFiles: File[] = []
    sharedFolders: Folder[] = []
    isSharedLoading: boolean = false

    isDocumentPreviewOpen: boolean = false

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

    setSearchFilters(search: SearchDto) {
        this.search = search
    }

    closeActionModal() {
        this.setModalAction(null)
    }

    navigateToFolder(folder: Folder) {
        this.currentFolder = folder
        this.currentFolderId = folder.id
        this.isCurrentFolderReady = false
    }

    setIsDocumentPreviewOpen(isOpen: boolean) {
        this.isDocumentPreviewOpen = isOpen
    }

    resetPagination() {
        this.pagination = {
            limit: FOLDER_CONTENTS_TABLE_PAGE_SIZE,
            offset: 0,
            total: -1,
        }
    }

    resetSearchPagination() {
        this.searchPagination = {
            limit: FOLDER_CONTENTS_TABLE_PAGE_SIZE,
            offset: 0,
            total: -1,
        }
    }

    resetSort() {
        this.sort = {
            field: null,
            direction: SortingDirection.Asc,
        }
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

            const total = rootFolder.foldersCount + rootFolder.filesCount
            this.pagination.total = total
            this.pagination.offset = this.pagination.limit
        } catch (error) {
            console.error("Error fetching root folder:", error)
            toast.error(t("toast.folder.loadFolerFailed", { ns: "common" }))
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

            const total = folder.foldersCount + folder.filesCount
            this.pagination.total = total
            this.pagination.offset = this.pagination.limit
        } catch (error) {
            console.error("Error fetching folder:", error)
            toast.error(t("toast.folder.loadFolerFailed", { ns: "common" }))
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
            this.pagination.limit,
            this.sort.field ?? undefined,
            this.sort.direction
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
            toast.error(t("toast.folder.loadMoreFailed", { ns: "common" }))
            this.pagination.offset -= this.pagination.limit
        } finally {
            this.setIsLoading(false)
        }
    }

    async refreshFolderContents() {
        if (!this.currentFolder) {
            return
        }

        this.resetPagination()
        this.currentFolder.folders = []
        this.currentFolder.files = []
        this.clearSelectedFolders()
        fileStore.clearSelectedFiles()

        this.fetchMoreFolderContents()
    }

    async refreshSearchResults() {
        if (!this.currentFolder) {
            return
        }

        this.resetSearchPagination()
        this.searchResults.folders = []
        this.searchResults.files = []
        this.clearSelectedFolders()
        fileStore.clearSelectedFiles()

        this.fetchMoreSearchResults()
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
            toast.error(t("toast.folder.createFailed", { ns: "common" }))
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

            await this.refreshFolderContents()
            this.closeActionModal()
            await this.getPinnedFiles()
        } catch (error) {
            console.error("Error renaming folder:", error)
            toast.error(t("toast.folder.renameFailed", { ns: "common" }))
        } finally {
            this.closeActionModal()
            this.setActionLoading(false)
        }
    }

    async deleteFolder(id: string) {
        const dto = new DeleteFolderDto(id)

        try {
            this.setActionLoading(true)
            await folderService.delete(dto)
            toast.success(t("toast.folder.deleted", { ns: "common" }))

            await this.refreshFolderContents()
            this.closeActionModal()
            await this.getPinnedFiles()
        } catch (error) {
            console.error("Error deleting folder:", error)
            toast.error(t("toast.folder.deleteFailed", { ns: "common" }))
        } finally {
            this.setActionLoading(false)
            this.closeActionModal()
        }
    }

    async getSearchResults() {
        try {
            this.setIsLoading(true)
            const results = await searchService.getResults(this.search)

            this.searchResults = {
                folders: results.folders,
                files: results.files,
            }

            const { foldersCount, filesCount } = results
            this.searchPagination.total = foldersCount + filesCount
            this.searchPagination.offset = this.searchPagination.limit
        } catch (error) {
            console.error("Error fetching search results:", error)
            toast.error(t("toast.folder.searchLoadFailed", { ns: "common" }))

            this.searchResults = {
                folders: [],
                files: [],
            }
        } finally {
            this.setIsLoading(false)
        }
    }

    async fetchMoreSearchResults() {
        if (!this.currentFolder) {
            return
        }

        this.setIsLoading(true)

        const dto = new SearchDto({
            ...this.search,
            offset: this.searchPagination.offset,
            limit: this.searchPagination.limit,
            sortByField: this.sort.field ?? undefined,
            sortOrder: this.sort.direction,
        })

        try {
            const contents = await searchService.getResults(dto)
            const { files, folders, foldersCount, filesCount } = contents

            this.searchResults.files = [...this.searchResults.files, ...files]
            this.searchResults.folders = [
                ...this.searchResults.folders,
                ...folders,
            ]
            this.searchPagination.total = foldersCount + filesCount
            this.searchPagination.offset += this.pagination.limit
        } catch (error) {
            console.error("Error fetching more folder contents:", error)
            toast.error(t("toast.folder.loadMoreFailed", { ns: "common" }))
            this.searchPagination.offset -= this.pagination.limit
        } finally {
            this.setIsLoading(false)
        }
    }

    async getPinnedFiles() {
        this.isSharedLoading = true
        const dto = new SearchDto({
            starred: true,
            limit: Number.MAX_SAFE_INTEGER,
            offset: 0,
        })

        try {
            const sharedFiles = await searchService.getResults(dto)

            this.sharedFiles = sharedFiles.files
            this.sharedFolders = sharedFiles.folders
        } catch (error) {
            console.error("Error fetching pinned files:", error)
            toast.error(t("toast.folder.starredLoadFailed", { ns: "common" }))
        } finally {
            this.isSharedLoading = false
        }
    }

    async togglePinned(folder: Folder) {
        try {
            folder.starred = !folder.starred
            await folderService.togglePinned(folder.id)

            await folderStore.getPinnedFiles()
        } catch (error) {
            console.error("Failed to toggle pinned status:", error)
            toast.error(t("toast.folder.updateStarredFailed", { ns: "common" }))
        }
    }

    async updateSort(field: string | null, search: boolean = false) {
        this.resolveSort(field)
        if (search) {
            await this.refreshSearchResults()
            return
        }

        await this.refreshFolderContents()
    }

    private resolveSort(field: string | null) {
        if (this.sort.field !== field) {
            this.sort.field = field
            this.sort.direction = SortingDirection.Asc
            return
        }

        if (this.sort.direction === SortingDirection.Asc) {
            this.sort.direction = SortingDirection.Desc
            return
        }

        if (this.sort.direction === SortingDirection.Desc) {
            this.sort.direction = SortingDirection.Asc
            this.sort.field = null
            return
        }
    }
}

export const folderStore = new FolderStore()

