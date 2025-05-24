import React from "react"
import { ContextMenu as RadixContextMenu } from "radix-ui"
import styles from "./styles.module.scss"
import { IconName } from "@/ui/shared/Icon/types"
import Icon from "@/ui/shared/Icon"
import { TEST_IDS } from "@/shared/constants/tests/shared"

export type ContextMenuItem = {
    label: string
    iconName?: IconName
    onClick: () => void
    visible?: boolean
}

export type ContextMenuGroup = {
    header?: string
    items: ContextMenuItem[]
}

export type ContextMenuProps = {
    groups: ContextMenuGroup[]
    children: React.ReactNode
}

function isGroupVisible(group: ContextMenuGroup): boolean {
    return group.items.some((item) => isItemVisible(item))
}

function isItemVisible(item: ContextMenuItem): boolean {
    return item.visible !== false
}

export default function ContextMenu(props: ContextMenuProps) {
    const { groups, children } = props

    return (
        <RadixContextMenu.Root>
            <RadixContextMenu.Trigger className={styles.Trigger}>
                {children}
            </RadixContextMenu.Trigger>

            <RadixContextMenu.Portal>
                <RadixContextMenu.Content
                    className={styles.Content}
                    data-testid={TEST_IDS.ContextMenuContent}
                >
                    {groups.map((group, groupIndex) => {
                        if (!isGroupVisible(group)) {
                            return null
                        }

                        return (
                            <React.Fragment key={groupIndex}>
                                {group.header && (
                                    <RadixContextMenu.Label
                                        className={styles.Label}
                                    >
                                        {group.header}
                                    </RadixContextMenu.Label>
                                )}

                                {group.items.map((item, itemIndex) => {
                                    if (!isItemVisible(item)) {
                                        return null
                                    }

                                    return (
                                        <RadixContextMenu.Item
                                            key={itemIndex}
                                            className={styles.Item}
                                            onClick={item.onClick}
                                        >
                                            {item.iconName && (
                                                <span className={styles.Icon}>
                                                    <Icon
                                                        name={item.iconName}
                                                    />
                                                </span>
                                            )}
                                            {item.label}
                                        </RadixContextMenu.Item>
                                    )
                                })}

                                {groupIndex < groups.length - 1 && (
                                    <RadixContextMenu.Separator
                                        className={styles.Separator}
                                    />
                                )}
                            </React.Fragment>
                        )
                    })}
                </RadixContextMenu.Content>
            </RadixContextMenu.Portal>
        </RadixContextMenu.Root>
    )
}

