import Icon from "@/ui/shared/Icon"
import Content from "./Content"
import Popover from "@/ui/shared/Popover"
import { IconName } from "@/ui/shared/Icon/types"

export default function FilteringOptionsPopover() {
    return (
        <Popover
            renderTrigger={() => (
                <div>
                    <Icon name={IconName.Filter} width="24px" height="24px" />
                </div>
            )}
            renderContent={() => <Content />}
        />
    )
}

