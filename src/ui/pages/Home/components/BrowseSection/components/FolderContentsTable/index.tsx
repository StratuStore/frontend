import { File } from "@/entities/File"
import { fileStore } from "@/entities/File/store"
import { Folder } from "@/entities/Folder"
import { useTableData } from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/hooks/useTableData"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef, useEffect, useCallback } from "react"
import styles from "./styles.module.scss"
import TableRow from "./components/TableRow"
import { useLocation, useNavigate } from "react-router"
import Loader from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/components/Loader"
import NoContent from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/components/NoContent"
import { folderStore } from "@/entities/Folder/store"
import FolderContentsContextMenu from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/components/FolderContextMenu"
import { observer } from "mobx-react-lite"
import FolderActionModal from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/components/FodlerActionModal"
import FileActionModal from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/components/FileActionModal"
import Spinner from "@/ui/shared/Spinner"
import FilePreviewModal from "@/ui/shared/Modals/FilePreviewModal"
import { TEST_IDS } from "@/shared/constants/tests/shared"
import FileAccessSettingsModal from "@/ui/shared/Modals/FileAceesSettingsModal"
import { SortingDirection } from "@/entities/Folder/types/SortingDirection"
import clsx from "clsx"

interface FolderContentsTableProps {
    files: File[]
    folders: Folder[]
    loading?: boolean
    disableContextMenu?: boolean
    isCurrentFolderReady?: boolean
    isLoadingMore?: boolean
    hasMore?: boolean
    onLoadMore: () => void
    onSortChange: (sortField: string) => Promise<void>
}

type TableItem = {
    id: string
    name: string
    createdAt: string
    type: string
    size: string
    originalItem: File | Folder
}

const sortFieldMap: Record<string, string> = {
    name: "name",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    size: "size",
}

function isFolderActive(folder: Folder, selectedFolders: Folder[]) {
    return selectedFolders.some(
        (selectedFolder) => selectedFolder.id === folder.id
    )
}

function isFileActive(file: File, selectedFiles: File[]) {
    return selectedFiles.some((selectedFile) => selectedFile.id === file.id)
}

function FolderContentsTableComponent({
    files,
    folders,
    loading = false,
    disableContextMenu = false,
    isLoadingMore = false,
    hasMore = false,
    onLoadMore,
    onSortChange,
}: FolderContentsTableProps) {
    const parentRef = useRef<HTMLDivElement>(null)
    const loaderRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const location = useLocation()

    const { data, columns } = useTableData(files, folders)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const selectedFolders = folderStore.selectedFolders
    const selectedFiles = fileStore.selectedFiles

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

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries

            if (entry.isIntersecting && !folderStore.isLoading && hasMore) {
                onLoadMore()
            }
        },
        [onLoadMore, hasMore]
    )

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        })

        const loader = loaderRef.current

        if (loader) {
            observer.observe(loaderRef.current)
        }

        return () => {
            if (loader) {
                observer.unobserve(loader)
            }
        }
    }, [handleObserver, folders, files])

    useEffect(() => {
        folderStore.clearSelectedFolders()
        fileStore.clearSelectedFiles()
        folderStore.resetPagination()
        folderStore.resetSort()
    }, [location.pathname])

    function handleFileClick(file: File) {
        folderStore.clearSelectedFolders()
        fileStore.selectFile(file)
    }

    function handleFolderClick(folder: Folder) {
        fileStore.clearSelectedFiles()
        folderStore.selectFolder(folder)
    }

    function handleFolderDoubleClick(folder: Folder) {
        folderStore.navigateToFolder(folder)

        folderStore.clearSelectedFolders()
        fileStore.clearSelectedFiles()

        navigate(`/folder/${folder.id}`)
    }

    const handleRowClick = (item: TableItem) => {
        if (item.originalItem.constructor === Folder) {
            handleFolderClick(item.originalItem as Folder)
        } else {
            handleFileClick(item.originalItem as File)
        }
    }

    const handleHeaderClick = async (columnId: string) => {
        const sortField = sortFieldMap[columnId] || null

        if (!sortField) {
            return
        }

        await onSortChange(sortField)
    }

    const getSortIndicator = (columnId: string) => {
        const sortField = sortFieldMap[columnId]

        if (folderStore.sort.field !== sortField) {
            return null
        }

        return folderStore.sort.direction === SortingDirection.Asc ? "↑" : "↓"
    }

    if (loading && !isLoadingMore) {
        return <Loader />
    }

    if (folders.length === 0 && files.length === 0) {
        return <NoContent />
    }

    return (
        <FolderContentsContextMenu disabled={disableContextMenu}>
            <div ref={parentRef} className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead className={styles.tableHeader}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className={clsx(
                                            styles.tableHeaderCell,
                                            {
                                                [styles.sortableHeader]:
                                                    header.column.id in
                                                    sortFieldMap,
                                            }
                                        )}
                                        onClick={() =>
                                            handleHeaderClick(header.id)
                                        }
                                    >
                                        <div className={styles.headerContent}>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            <span
                                                className={styles.sortIndicator}
                                            >
                                                {getSortIndicator(header.id)}
                                            </span>
                                        </div>
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

                            if (
                                row.original.originalItem.constructor === Folder
                            ) {
                                return (
                                    <TableRow
                                        key={row.id}
                                        row={row}
                                        virtualRow={virtualRow}
                                        active={isFolderActive(
                                            row.original.originalItem as Folder,
                                            selectedFolders
                                        )}
                                        measureElement={(node) =>
                                            rowVirtualizer.measureElement(node)
                                        }
                                        onClick={() =>
                                            handleRowClick(row.original)
                                        }
                                        onDoubleClick={() =>
                                            handleFolderDoubleClick(
                                                row.original
                                                    .originalItem as Folder
                                            )
                                        }
                                        wrapperProps={{
                                            "data-testid": `${TEST_IDS.FolderRow}-${row.original.originalItem.id}`,
                                        }}
                                    />
                                )
                            }

                            return (
                                <TableRow
                                    key={row.id}
                                    row={row}
                                    virtualRow={virtualRow}
                                    active={isFileActive(
                                        row.original.originalItem as File,
                                        selectedFiles
                                    )}
                                    measureElement={(node) =>
                                        rowVirtualizer.measureElement(node)
                                    }
                                    onClick={() => handleRowClick(row.original)}
                                    onDoubleClick={() =>
                                        folderStore.setIsDocumentPreviewOpen(
                                            true
                                        )
                                    }
                                    wrapperProps={{
                                        "data-testid": `${TEST_IDS.FileRow}-${row.original.originalItem.id}`,
                                    }}
                                />
                            )
                        })}
                    </tbody>
                </table>

                <div ref={loaderRef} className={styles.loaderContainer}>
                    {isLoadingMore && <Spinner width="32px" height="32px" />}
                </div>

                <FolderActionModal />
                <FileActionModal />
                <FilePreviewModal
                    open={folderStore.isDocumentPreviewOpen}
                    closeModal={() =>
                        folderStore.setIsDocumentPreviewOpen(false)
                    }
                    file={fileStore.selectedFiles[0] || null}
                />
                <FileAccessSettingsModal
                    file={selectedFiles[0]}
                    open={fileStore.isAccessSettingsModalOpen}
                    closeModal={() =>
                        fileStore.setIsAccessSettingsModalOpen(false)
                    }
                />
            </div>
        </FolderContentsContextMenu>
    )
}

const FolderContentsTable = observer(FolderContentsTableComponent)

export default FolderContentsTable

