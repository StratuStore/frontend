import { useMemo } from "react"
import { File } from "@/entities/File"
import { Folder } from "@/entities/Folder"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslation } from "react-i18next"
import FolderBadge from "@/ui/shared/FolderBadge"
import FileBadge from "@/ui/shared/FileBadge"

export type TableItem = {
    id: string
    name: string
    createdAt: string
    type: string
    size: string
    originalItem: File | Folder
}

export function useTableData(files: File[], folders: Folder[]) {
    const { t } = useTranslation("home")
    const columnHelper = createColumnHelper<TableItem>()

    const data = useMemo(() => {
        const folderItems: TableItem[] = folders.map((folder) => ({
            id: folder.path.join("/"),
            name: folder.path.at(-1) || "",
            createdAt: folder.createdAt,
            type: t("folderContentsTable.folderItemType"),
            size: "-",
            originalItem: folder,
        }))

        const fileItems: TableItem[] = files.map((file) => ({
            id: file.name,
            name: file.name,
            createdAt: file.createdAt,
            type:
                file.name.split(".").pop()?.toUpperCase() ||
                t("folderContentsTable.fileTypeUnknown"),
            size: file.size.toString(),
            originalItem: file,
        }))

        return [...folderItems, ...fileItems]
    }, [files, folders, t])

    const columns = useMemo(
        () => [
            columnHelper.accessor("name", {
                header: t("folderContentsTable.name"),
                cell: (info) => {
                    const item = info.row.original
                    return item.originalItem.constructor === Folder ? (
                        <FolderBadge name={item.name} />
                    ) : (
                        <FileBadge name={item.name} />
                    )
                },
            }),
            columnHelper.accessor("createdAt", {
                header: t("folderContentsTable.createdAt"),
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("type", {
                header: t("folderContentsTable.type"),
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("size", {
                header: t("folderContentsTable.size"),
                cell: (info) => info.getValue(),
            }),
        ],
        [columnHelper, t]
    )

    return { data, columns }
}

