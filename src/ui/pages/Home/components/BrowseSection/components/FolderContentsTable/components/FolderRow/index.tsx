import { Row } from "@tanstack/react-table"
import { VirtualItem } from "@tanstack/react-virtual"
import { TableItem } from "../../hooks/useTableData"
import TableRow from "../TableRow"

interface FolderRowProps {
    row: Row<TableItem>
    virtualRow: VirtualItem
    measureElement: (node: HTMLTableRowElement | null) => void
    onRowClick: () => void
    onDoubleClick: () => void
}

export default function FolderRow({
    row,
    virtualRow,
    measureElement,
    onRowClick,
    onDoubleClick,
}: FolderRowProps) {
    return (
        <TableRow
            row={row}
            virtualRow={virtualRow}
            measureElement={measureElement}
            onClick={onRowClick}
            onDoubleClick={onDoubleClick}
        />
    )
}

