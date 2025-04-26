import React from "react"
import { ContextMenu as RadixContextMenu } from "radix-ui"
import styles from "./styles.module.scss"

interface ContextMenuItem {
    label: string
    icon?: React.ReactNode
    onClick: () => void
}

export type ContextMenuProps = {
    items: ContextMenuItem[]
    renderTrigger: () => React.ReactNode
}

export default function ContextMenu(props: ContextMenuProps) {
    const { items, renderTrigger } = props

    console.log("ContextMenu", items)

    return (
        <RadixContextMenu.Root>
            <RadixContextMenu.Trigger className={styles.Trigger}>
                {renderTrigger()}
            </RadixContextMenu.Trigger>

            <RadixContextMenu.Portal>
                <RadixContextMenu.Content className={styles.Content}>
                    {items.map((item, index) => (
                        <RadixContextMenu.Item
                            key={index}
                            className={styles.Item}
                            onClick={item.onClick}
                        >
                            {item.icon && (
                                <span className={styles.Icon}>{item.icon}</span>
                            )}
                            {item.label}
                        </RadixContextMenu.Item>
                    ))}
                </RadixContextMenu.Content>
            </RadixContextMenu.Portal>
        </RadixContextMenu.Root>
    )
}

