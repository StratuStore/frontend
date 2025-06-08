import { ContextMenuGroup } from "@/ui/shared/ContextMenu"
import { folderStore } from "@/entities/Folder/store"
import { fileStore } from "@/entities/File/store"
import { clipboardStore } from "@/entities/Clipboard/store"

export function useFolderContextMenuItems(): ContextMenuGroup[] {
    const selectedFiles = fileStore.selectedFiles
    const selectedFolders = folderStore.selectedFolders

    if (selectedFiles.length === 0 && selectedFolders.length === 0) {
        const clipboardItem = clipboardStore.getItem()
        const isPasteOptionVisible = clipboardItem !== null

        return [
            {
                items: [
                    {
                        label: "New folder",
                        onClick: () => {
                            folderStore.showCreateFolderModal()
                        },
                    },
                    {
                        label: "Upload a file",
                        onClick: () => {
                            if (!folderStore.currentFolder) {
                                return
                            }

                            fileStore.startFileUpload(folderStore.currentFolder)
                        },
                    },
                    {
                        label: "Paste",
                        onClick: () => {
                            clipboardStore.paste()
                        },
                        visible: isPasteOptionVisible,
                    },
                ],
            },
        ]
    }

    if (selectedFolders.length === 1 && selectedFiles.length === 0) {
        const folder = selectedFolders[0]

        return [
            {
                items: [
                    {
                        label: "Cut",
                        onClick: () => {
                            clipboardStore.cutToClipboard(
                                folderStore.selectedFolders[0]
                            )
                        },
                    },
                    {
                        label: "Upload a file to this folder",
                        onClick: () => {
                            if (!folderStore.currentFolder) {
                                return
                            }

                            fileStore.startFileUpload(
                                folderStore.selectedFolders[0]
                            )
                        },
                    },
                    {
                        label: folder.starred
                            ? "Remove from starred"
                            : "Add to starred",
                        onClick: () => {
                            folderStore.togglePinned(folder)
                        },
                    },
                    {
                        label: "Rename",
                        onClick: () => {
                            folderStore.showRenameFolderModal()
                        },
                    },
                    {
                        label: "Delete",
                        onClick: () => {
                            folderStore.showDeleteFolderModal()
                        },
                    },
                ],
            },
        ]
    }

    if (selectedFiles.length === 1 && selectedFolders.length === 0) {
        const file = selectedFiles[0]

        return [
            {
                items: [
                    {
                        label: "Cut",
                        onClick: () => {
                            clipboardStore.cutToClipboard(
                                fileStore.selectedFiles[0]
                            )
                        },
                    },
                    {
                        label: "Download",
                        onClick: () => {
                            fileStore.downloadFile(selectedFiles[0])
                        },
                    },
                    {
                        label: "Rename",
                        onClick: () => {
                            fileStore.showRenameFileModal()
                        },
                    },
                    {
                        label: "Manage access",
                        onClick: () => {
                            fileStore.setIsAccessSettingsModalOpen(true)
                        },
                    },
                    {
                        label: file.starred
                            ? "Remove from starred"
                            : "Add to starred",
                        onClick: () => {
                            fileStore.togglePinned(file)
                        },
                    },
                    {
                        label: "Delete",
                        onClick: () => {
                            fileStore.showDeleteFileModal()
                        },
                    },
                ],
            },
        ]
    }

    return [
        {
            items: [],
        },
    ]
}

