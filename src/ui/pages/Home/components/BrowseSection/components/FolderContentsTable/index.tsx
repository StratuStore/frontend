import { File } from "@/entities/File"
import { fileStore } from "@/entities/File/store"
import { Folder } from "@/entities/Folder"
import { useFileUpload } from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/hooks/useFileUpload"
import { useTableData } from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/hooks/useTableData"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "react"
import styles from "./styles.module.scss"
import FolderRow from "./components/FolderRow"
import TableRow from "./components/TableRow"
import { useNavigate } from "react-router"
import Loader from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/components/Loader"
import NoContent from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/components/NoContent"

interface FolderContentsTableProps {
    files: File[]
    folders: Folder[]
    loading?: boolean
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
    loading = false,
}: FolderContentsTableProps) {
    const parentRef = useRef<HTMLDivElement>(null)

    const { data, columns } = useTableData(files, folders)
    const { fileInputRef, handleFileInputChange, handleUploadClick } =
        useFileUpload()

    const navigate = useNavigate()

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

    const handleRowClick = (item: TableItem) => {
        if (item.originalItem.constructor === Folder) {
            navigate(`/folder/${item.originalItem.id}`)
        } else {
            handleFileClick(item.originalItem as File)
        }
    }

    if (loading) {
        console.log("LOADING")
        return <Loader />
    }

    if (folders.length === 0 && files.length === 0) {
        console.log("NO CONTENT")
        return <NoContent />
    }

    return (
        <div ref={parentRef} className={styles.tableWrapper}>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileInputChange}
                multiple
            />

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

                        if (row.original.originalItem.getType() === Folder) {
                            return (
                                <FolderRow
                                    key={row.id}
                                    row={row}
                                    virtualRow={virtualRow}
                                    measureElement={(node) =>
                                        rowVirtualizer.measureElement(node)
                                    }
                                    onRowClick={() =>
                                        handleRowClick(row.original)
                                    }
                                    onUploadClick={handleUploadClick}
                                />
                            )
                        }

                        return (
                            <TableRow
                                key={row.id}
                                row={row}
                                virtualRow={virtualRow}
                                measureElement={(node) =>
                                    rowVirtualizer.measureElement(node)
                                }
                                onClick={() => handleRowClick(row.original)}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

