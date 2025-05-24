import * as React from "react"
import { Select as RadixSelect } from "radix-ui"
import clsx from "clsx"
import styles from "./styles.module.scss"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import { TEST_IDS } from "@/shared/constants/tests/shared"

export type SelectItem = {
    value: string
    label: string
    disabled?: boolean
}

export type SelectProps = React.ComponentProps<typeof RadixSelect.Root> & {
    items: SelectItem[]
    placeholder?: string
    triggerProps?: React.ComponentProps<typeof RadixSelect.Trigger> &
        Record<string, string>
}

export default function Select({
    items,
    placeholder,
    triggerProps,
    ...rest
}: SelectProps) {
    return (
        <RadixSelect.Root {...rest}>
            <RadixSelect.Trigger className={styles.trigger} {...triggerProps}>
                <RadixSelect.Value placeholder={placeholder} />
                <RadixSelect.Icon className={styles.icon}>
                    <Icon
                        name={IconName.ChevronDown}
                        width="20px"
                        height="20px"
                    />
                </RadixSelect.Icon>
            </RadixSelect.Trigger>

            <RadixSelect.Portal>
                <RadixSelect.Content
                    className={styles.content}
                    position="popper"
                    sideOffset={5}
                    data-testid={TEST_IDS.PopoverContent}
                >
                    <RadixSelect.Viewport className={styles.viewport}>
                        {items.map((item) => (
                            <RadixSelect.Item
                                className={clsx(styles.item)}
                                key={item.value}
                                value={item.value}
                            >
                                <div className={styles.indicatorPlaceholder}>
                                    <RadixSelect.ItemIndicator
                                        className={styles.itemIndicator}
                                    >
                                        <Icon
                                            name={IconName.Check}
                                            width="16px"
                                            height="16px"
                                        />
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

