import Popover, { PopoverProps } from "@/ui/shared/Popover"

export function TestPopover(props?: Partial<PopoverProps>) {
    return (
        <Popover
            renderTrigger={() => (
                <button data-testid="trigger">Open Popover</button>
            )}
            renderContent={() => (
                <div data-testid="content">Popover Content</div>
            )}
            {...props}
        />
    )
}

