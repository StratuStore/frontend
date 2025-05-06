import { ContextMenuGroup } from "@/ui/shared/ContextMenu"
import { folderStore } from "@/entities/Folder/store"
import { fileStore } from "@/entities/File/store"

export function useFolderContextMenuItems(): ContextMenuGroup[] {
    const selectedFiles = fileStore.selectedFiles
    const selectedFolders = folderStore.selectedFolders

    if (selectedFiles.length === 0 && selectedFolders.length === 0) {
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
                        onClick: () => {},
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

