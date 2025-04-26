import { Row } from "@tanstack/react-table"
import { VirtualItem } from "@tanstack/react-virtual"
import { TableItem } from "../../hooks/useTableData"
import styles from "../../styles.module.scss"
import { flexRender } from "@tanstack/react-table"

interface TableRowProps {
    row: Row<TableItem>
    virtualRow: VirtualItem
    measureElement: (node: HTMLTableRowElement | null) => void
    onClick: () => void
}

export default function TableRow({
    row,
    virtualRow,
    measureElement,
    onClick,
}: TableRowProps) {
    return (
        <tr
            key={row.id}
            data-index={virtualRow.index}
            ref={measureElement}
            className={styles.tableRow}
            onClick={onClick}
            style={{
                transform: `translateY(${virtualRow.start}px)`,
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.tableCell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            ))}
        </tr>
    )
}

