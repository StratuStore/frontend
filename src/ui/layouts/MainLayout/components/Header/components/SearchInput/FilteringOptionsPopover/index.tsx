import Icon from "@/ui/shared/Icon"
import Content from "./Content"
import Popover from "@/ui/shared/Popover"
import { IconName } from "@/ui/shared/Icon/types"
import Button from "@/ui/shared/Button"

export default function FilteringOptionsPopover() {
    return (
        <Popover
            renderTrigger={() => (
                <Button variant="icon">
                    <Icon name={IconName.Filter} width="24px" height="24px" />
                </Button>
            )}
            renderContent={() => <Content />}
        />
    )
}

