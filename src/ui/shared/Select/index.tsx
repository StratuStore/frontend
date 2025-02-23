import * as React from "react"
import { Select as RadixSelect } from "radix-ui"
import clsx from "clsx"
import styles from "./styles.module.scss"

export type SelectItem = {
    value: string
    label: string
    disabled?: boolean
}

export type SelectProps = React.ComponentProps<typeof RadixSelect.Root> & {
    items: SelectItem[]
    placeholder?: string
}

export default function Select({ items, placeholder, ...rest }: SelectProps) {
    return (
        <RadixSelect.Root {...rest}>
            <RadixSelect.Trigger className={styles.trigger} aria-label="Food">
                <RadixSelect.Value placeholder={placeholder} />
                <RadixSelect.Icon className={styles.icon}>D</RadixSelect.Icon>
            </RadixSelect.Trigger>

            <RadixSelect.Portal>
                <RadixSelect.Content
                    className={styles.content}
                    position="popper"
                    sideOffset={5}
                >
                    <RadixSelect.Viewport className={styles.viewport}>
                        {items.map((item) => (
                            <RadixSelect.Item
                                className={clsx(styles.item)}
                                key={item.value}
                                value={item.value}
                            >
                                <div>
                                    <RadixSelect.ItemIndicator
                                        className={styles.itemIndicator}
                                    >
                                        C
                                    </RadixSelect.ItemIndicator>
                                </div>
                                <RadixSelect.ItemText>
                                    {item.label}
                                </RadixSelect.ItemText>
                            </RadixSelect.Item>
                        ))}
                    </RadixSelect.Viewport>
                </RadixSelect.Content>
            </RadixSelect.Portal>
        </RadixSelect.Root>
    )
}

