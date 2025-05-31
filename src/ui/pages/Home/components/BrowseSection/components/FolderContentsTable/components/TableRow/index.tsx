import { Row } from "@tanstack/react-table"
import { VirtualItem } from "@tanstack/react-virtual"
import { TableItem } from "../../hooks/useTableData"
import styles from "../../styles.module.scss"
import { flexRender } from "@tanstack/react-table"
import clsx from "clsx"
import { observer } from "mobx-react-lite"
import { clipboardStore } from "@/entities/Clipboard/store"

interface TableRowProps {
    row: Row<TableItem>
    virtualRow: VirtualItem
    active?: boolean
    wrapperProps?: React.HTMLAttributes<HTMLTableRowElement> &
        Record<string, string>

    measureElement: (node: HTMLTableRowElement | null) => void
    onClick: () => void
    onDoubleClick?: () => void
    onContextMenu?: () => void
}

function TableRowComponent({
    row,
    virtualRow,
    active = false,
    wrapperProps = {},

    measureElement,
    onClick,
    onDoubleClick,
    onContextMenu,
}: TableRowProps) {
    const clipboardItem = clipboardStore.getItem()

    function isRowInClipboard() {
        if (!clipboardItem) {
            return false
        }

        return clipboardItem.id === row.original.originalItem.id
    }

    const isItemInClipboard = isRowInClipboard()

    return (
        <tr
            key={row.id}
            data-index={virtualRow.index}
            ref={measureElement}
            className={clsx(styles.tableRow, {
                [styles.active]: active,
                [styles.clipboard]: isItemInClipboard,
            })}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            onContextMenu={onContextMenu}
            style={{
                transform: `translateY(${virtualRow.start}px)`,
            }}
            {...wrapperProps}
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

