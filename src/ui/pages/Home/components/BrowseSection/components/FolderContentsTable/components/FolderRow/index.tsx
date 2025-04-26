import { Row } from "@tanstack/react-table"
import { VirtualItem } from "@tanstack/react-virtual"
import { TableItem } from "../../hooks/useTableData"
import { Folder } from "@/entities/Folder"
import ContextMenu from "@/ui/shared/ContextMenu"
import TableRow from "../TableRow"

interface FolderRowProps {
    row: Row<TableItem>
    virtualRow: VirtualItem
    measureElement: (node: HTMLTableRowElement | null) => void
    onRowClick: () => void
    onUploadClick: (folder: Folder) => void
}

export default function FolderRow({
    row,
    virtualRow,
    measureElement,
    onRowClick,
    onUploadClick,
}: FolderRowProps) {
    return (
        <ContextMenu
            renderTrigger={() => (
                <TableRow
                    row={row}
                    virtualRow={virtualRow}
                    measureElement={measureElement}
                    onClick={onRowClick}
                />
            )}
            items={[
                {
                    label: "Upload a file",
                    onClick: () =>
                        onUploadClick(row.original.originalItem as Folder),
                },
            ]}
        />
    )
}

