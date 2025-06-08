import Button from "@/ui/shared/Button"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import Swiper from "swiper"

export type SwiperControlsProps = {
    hasNext: boolean
    hasPrev: boolean
    swiper?: Swiper
}

export default function SwiperControls({
    hasNext,
    hasPrev,
    swiper,
}: SwiperControlsProps) {
    return (
        <div>
            <Button
                variant="icon"
                disabled={!hasPrev}
                onClick={() => swiper?.slidePrev()}
            >
                <Icon name={IconName.ChevronLeft} width="24px" height="24px" />
            </Button>
            <Button
                variant="icon"
                disabled={!hasNext}
                onClick={() => swiper?.slideNext()}
            >
                <Icon name={IconName.ChevronRight} width="24px" height="24px" />
            </Button>
        </div>
    )
}

