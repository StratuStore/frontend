import Button from "@/ui/shared/Button"
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js"
import Icon from "@mdi/react"

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
                <Icon path={mdiChevronLeft} size="24px" />
            </Button>
            <Button variant="icon" disabled={!hasNext} onClick={setNext}>
                <Icon path={mdiChevronRight} size="24px" />
            </Button>
        </div>
    )
}

