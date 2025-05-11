import { Row } from "@tanstack/react-table"
import { VirtualItem } from "@tanstack/react-virtual"
import { TableItem } from "../../hooks/useTableData"
import styles from "../../styles.module.scss"
import { flexRender } from "@tanstack/react-table"
import clsx from "clsx"
import { observer } from "mobx-react-lite"
interface TableRowProps {
    row: Row<TableItem>
    virtualRow: VirtualItem
    active?: boolean

    measureElement: (node: HTMLTableRowElement | null) => void
    onClick: () => void
    onDoubleClick?: () => void
    onContextMenu?: () => void
}

function TableRowComponent({
    row,
    virtualRow,
    active = false,

    measureElement,
    onClick,
    onDoubleClick,
    onContextMenu,
}: TableRowProps) {
    return (
        <tr
            key={row.id}
            data-index={virtualRow.index}
            ref={measureElement}
            className={clsx(styles.tableRow, {
                [styles.active]: active,
            })}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            onContextMenu={onContextMenu}
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

const TableRow = observer(TableRowComponent)
export default TableRow

