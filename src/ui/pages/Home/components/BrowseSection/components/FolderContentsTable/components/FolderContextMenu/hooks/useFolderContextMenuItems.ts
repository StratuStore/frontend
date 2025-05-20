import { ContextMenuGroup } from "@/ui/shared/ContextMenu"
import { folderStore } from "@/entities/Folder/store"
import { fileStore } from "@/entities/File/store"
import { clipboardStore } from "@/entities/Clipboard/store"

export function useFolderContextMenuItems(): ContextMenuGroup[] {
    const selectedFiles = fileStore.selectedFiles
    const selectedFolders = folderStore.selectedFolders

    const clipboardItem = clipboardStore.getItem()
    console.log("clipboardItem", clipboardItem)

    if (selectedFiles.length === 0 && selectedFolders.length === 0) {
        const clipboardItem = clipboardStore.getItem()
        const isPasteOptionVisible = clipboardItem !== null

        return [
            {
                items: [
                    {
                        label: "New Folder",
                        onClick: () => {
                            folderStore.showCreateFolderModal()
                        },
                    },
                    {
                        label: "Upload Files",
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
                        label: "Rename",
                        onClick: () => {
                            folderStore.showRenameFolderModal()
                        },
                    },
                    {
                        label: "Cut",
                        onClick: () => {
                            clipboardStore.cutToClipboard(
                                folderStore.selectedFolders[0]
                            )
                        },
                    },
                    {
                        label: "Delete",
                        onClick: () => {
                            folderStore.deleteFolder(folder.id)
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
                        label: "Download",
                        onClick: () => {
                            fileStore.downloadFile()
                        },
                    },
                    {
                        label: "Rename",
                        onClick: () => {
                            fileStore.showRenameFileModal()
                        },
                    },
                    {
                        label: "Delete",
                        onClick: () => {
                            fileStore.deleteFile(file.id)
                        },
                    },
                ],
            },
        ]
    }

    return [
        {
            items: [
                // {
                //     label: "Download",
                //     onClick: () => {
                //         showDeleteMultipleItemsModal()
                //     },
                // },
                // {
                //     label: "Delete",
                //     onClick: () => {
                //         showDeleteMultipleItemsModal()
                //     },
                // },
            ],
        },
    ]
}

