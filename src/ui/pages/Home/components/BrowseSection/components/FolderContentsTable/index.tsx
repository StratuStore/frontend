import {
    createColumnHelper,
    getCoreRowModel,
    useReactTable,
    flexRender,
} from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useMemo, useRef } from "react"
import { File } from "@/entities/File"
import { Folder } from "@/entities/Folder"
import styles from "./styles.module.scss"
import FolderBadge from "@/ui/shared/FolderBadge"
import FileBadge from "@/ui/shared/FileBadge"
import { fileStore } from "@/entities/File/store"
import { useTranslation } from "react-i18next"

interface FolderContentsTableProps {
    files: File[]
    folders: Folder[]
}

type TableItem = {
    id: string
    name: string
    createdAt: string
    type: string
    size: string
    originalItem: File | Folder
}

export default function FolderContentsTable({
    files,
    folders,
}: FolderContentsTableProps) {
    const parentRef = useRef<HTMLDivElement>(null)
    const columnHelper = createColumnHelper<TableItem>()

    const { t } = useTranslation("home")

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
                    return item.type === "Folder" ? (
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

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const { rows } = table.getRowModel()

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35,
        measureElement:
            typeof window !== "undefined" &&
            navigator.userAgent.indexOf("Firefox") === -1
                ? (element) => element?.getBoundingClientRect().height
                : undefined,
        overscan: 10,
    })

    function handleFileClick(file: File) {
        fileStore.selectFile(file)
    }

    function handleFolderClick(folder: Folder) {
        console.log(folder)
    }

    const handleRowClick = (item: TableItem) => {
        if (item.type === "Folder") {
            handleFolderClick(item.originalItem as Folder)
        } else {
            handleFileClick(item.originalItem as File)
        }
    }

    return (
        <div ref={parentRef} className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead className={styles.tableHeader}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className={styles.tableHeaderCell}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        position: "relative",
                        width: "100%",
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const row = rows[virtualRow.index]
                        return (
                            <tr
                                key={row.id}
                                data-index={virtualRow.index}
                                ref={(node) =>
                                    rowVirtualizer.measureElement(node)
                                }
                                className={styles.tableRow}
                                onClick={() => handleRowClick(row.original)}
                                style={{
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={styles.tableCell}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

