import {
    createColumnHelper,
    getCoreRowModel,
    useReactTable,
    flexRender,
} from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useMemo, useRef } from "react"
import { File } from "@/types/models/File"
import { Folder } from "@/types/models/Folder"
import styles from "./styles.module.scss"
import FolderBadge from "@/ui/shared/FolderBadge"
import FileBadge from "@/ui/shared/FileBadge"

interface FolderContentsTableProps {
    files: File[]
    folders: Folder[]
    onFileClick?: (file: File) => void
    onFolderClick?: (folder: Folder) => void
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
    onFileClick,
    onFolderClick,
}: FolderContentsTableProps) {
    const parentRef = useRef<HTMLDivElement>(null)
    const columnHelper = createColumnHelper<TableItem>()

    const data = useMemo(() => {
        const folderItems: TableItem[] = folders.map((folder) => ({
            id: folder.path.join("/"),
            name: folder.path.at(-1) || "",
            createdAt: folder.createdAt,
            type: "Folder",
            size: "-",
            originalItem: folder,
        }))

        const fileItems: TableItem[] = files.map((file) => ({
            id: file.name,
            name: file.name,
            createdAt: file.createdAt,
            type: file.name.split(".").pop()?.toUpperCase() || "unknown",
            size: file.size.toString(),
            originalItem: file,
        }))

        return [...folderItems, ...fileItems]
    }, [files, folders])

    const columns = useMemo(
        () => [
            columnHelper.accessor("name", {
                header: "Filename",
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
                header: "Date of creation",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("type", {
                header: "Type",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("size", {
                header: "Size",
                cell: (info) => info.getValue(),
            }),
        ],
        [columnHelper]
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

    const handleRowClick = (item: TableItem) => {
        if (item.type === "Folder") {
            onFolderClick?.(item.originalItem as Folder)
        } else {
            onFileClick?.(item.originalItem as File)
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

