import SwiperControls from "@/ui/pages/Home/components/PinnedItemsSection/components/SwiperControls"

import styles from "./styles.module.scss"
import Swiper from "swiper"
import { useTranslation } from "react-i18next"

export type SwiperHeaderProps = {
    swiper?: Swiper
}

export default function SwiperHeader({ swiper }: SwiperHeaderProps) {
    const { t } = useTranslation("home")

    if (!swiper) {
        return null
    }

    return (
        <div className={styles.headerRowWrapper}>
            <h2 className={styles.header}>{t("pinnedItemsSection.title")}</h2>
            <SwiperControls
                hasNext
                hasPrev
                setNext={() => swiper.slideNext()}
                setPrev={() => swiper.slidePrev()}
            />
        </div>
    )
}

