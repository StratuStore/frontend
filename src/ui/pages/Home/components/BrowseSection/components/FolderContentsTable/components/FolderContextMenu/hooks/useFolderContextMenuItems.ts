import { ContextMenuGroup } from "@/ui/shared/ContextMenu"
import { folderStore } from "@/entities/Folder/store"
import { fileStore } from "@/entities/File/store"
import { clipboardStore } from "@/entities/Clipboard/store"
import i18next from "i18next"

export const t = i18next.t.bind(i18next)

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
                        label: t("contextMenu.newFolder", { ns: "common" }),
                        onClick: () => {
                            folderStore.showCreateFolderModal()
                        },
                    },
                    {
                        label: t("contextMenu.uploadFile", { ns: "common" }),
                        onClick: () => {
                            if (!folderStore.currentFolder) {
                                return
                            }

                            fileStore.startFileUpload(folderStore.currentFolder)
                        },
                    },
                    {
                        label: t("contextMenu.paste", { ns: "common" }),
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
                        label: t("contextMenu.cut", { ns: "common" }),
                        onClick: () => {
                            clipboardStore.cutToClipboard(
                                folderStore.selectedFolders[0]
                            )
                        },
                    },
                    {
                        label: t("contextMenu.uploadFileToThisFolder", {
                            ns: "common",
                        }),
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
                            ? t("contextMenu.removeFromStarred", {
                                  ns: "common",
                              })
                            : t("contextMenu.addToStarred", { ns: "common" }),
                        onClick: () => {
                            folderStore.togglePinned(folder)
                        },
                    },
                    {
                        label: t("contextMenu.rename", { ns: "common" }),
                        onClick: () => {
                            folderStore.showRenameFolderModal()
                        },
                    },
                    {
                        label: t("contextMenu.delete", { ns: "common" }),
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
                        label: t("contextMenu.cut", { ns: "common" }),
                        onClick: () => {
                            clipboardStore.cutToClipboard(
                                fileStore.selectedFiles[0]
                            )
                        },
                    },
                    {
                        label: t("contextMenu.download", { ns: "common" }),
                        onClick: () => {
                            fileStore.downloadFile(selectedFiles[0])
                        },
                    },
                    {
                        label: t("contextMenu.rename", { ns: "common" }),
                        onClick: () => {
                            fileStore.showRenameFileModal()
                        },
                    },
                    {
                        label: t("contextMenu.manageAccess", { ns: "common" }),
                        onClick: () => {
                            fileStore.setIsAccessSettingsModalOpen(true)
                        },
                    },
                    {
                        label: file.starred
                            ? t("contextMenu.removeFromStarred", {
                                  ns: "common",
                              })
                            : t("contextMenu.addToStarred", { ns: "common" }),
                        onClick: () => {
                            fileStore.togglePinned(file)
                        },
                    },
                    {
                        label: t("contextMenu.delete", { ns: "common" }),
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

