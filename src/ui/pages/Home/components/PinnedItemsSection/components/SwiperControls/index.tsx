import Button from "@/ui/shared/Button"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"

export type SwiperControlsProps = {
    hasNext: boolean
    hasPrev: boolean
    setNext: () => void
    setPrev: () => void
}

export default function SwiperControls({
    hasNext,
    hasPrev,
    setNext,
    setPrev,
}: SwiperControlsProps) {
    return (
        <div>
            <Button variant="icon" disabled={!hasPrev} onClick={setPrev}>
                <Icon name={IconName.ChevronLeft} width="24px" height="24px" />
            </Button>
            <Button variant="icon" disabled={!hasNext} onClick={setNext}>
                <Icon name={IconName.ChevronRight} width="24px" height="24px" />
            </Button>
        </div>
    )
}

