import { Popover as RadixPopover } from "radix-ui"
import styles from "./styles.module.scss"

export type PopoverProps = {
    renderTrigger: () => React.ReactNode
    renderContent: () => React.ReactNode
}

export default function Popover({
    renderTrigger,
    renderContent,
}: PopoverProps) {
    return (
        <RadixPopover.Root>
            <RadixPopover.Trigger asChild>
                {renderTrigger()}
            </RadixPopover.Trigger>
            <RadixPopover.Portal>
                <RadixPopover.Content className={styles.content} sideOffset={5}>
                    {renderContent()}
                </RadixPopover.Content>
            </RadixPopover.Portal>
        </RadixPopover.Root>
    )
}

