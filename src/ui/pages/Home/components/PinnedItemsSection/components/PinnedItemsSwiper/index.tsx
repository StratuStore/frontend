import Swiper from "swiper"
import { ReactNode, useState } from "react"
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react"

import PinnedFolderCard from "@/ui/pages/Home/components/PinnedItemsSection/components/PinnedFolderCard"
import PinnedFileCard from "@/ui/pages/Home/components/PinnedItemsSection/components/PinnedFileCard"
import SwiperHeader from "@/ui/pages/Home/components/PinnedItemsSection/components/SwiperHeader"
import { Folder } from "@/entities/Folder"
import { File } from "@/entities/File"

import { PINNED_ITEM_CARD_WIDTH } from "@/ui/pages/Home/components/PinnedItemsSection/components/PinnedItemCard/constants"
import { PINNED_ITEM_CARDS_GAP } from "@/ui/pages/Home/components/PinnedItemsSection/components/PinnedItemsSwiper/constants"

import styles from "./styles.module.scss"
import Loading from "./components/Loading"
import NoContent from "./components/NoContent"

export type PinnedFilesSwiperProps = {
    folders: Folder[]
    files: File[]
    parentWidth: number
    loading?: boolean
}

function getCardsPerSlide(parentWidth: number) {
    const cardsPerSlide =
        Math.ceil(
            (parentWidth + PINNED_ITEM_CARDS_GAP) /
                (PINNED_ITEM_CARD_WIDTH + PINNED_ITEM_CARDS_GAP)
        ) - 1

    return cardsPerSlide < 1 ? 1 : cardsPerSlide
}

function getTotalCards(files: File[], folders: Folder[]) {
    return folders.length + files.length
}

function getTotalSlides(totalCards: number, cardsPerSlide: number) {
    return Math.ceil(totalCards / cardsPerSlide)
}

export default function PinnedItemsSwiper({
    folders,
    files,
    parentWidth,
    loading = false,
}: PinnedFilesSwiperProps) {
    const [swiper, setSwiper] = useState<Swiper | undefined>(undefined)

    const cardsPerSlide = getCardsPerSlide(parentWidth)
    const totalCards = getTotalCards(files, folders)
    const totalSlides = getTotalSlides(totalCards, cardsPerSlide)
    let renderedCards = 0

    function nextSlide() {
        const cards: ReactNode[] = []

        for (let i = 0; i < cardsPerSlide; i++) {
            let nextCard: ReactNode

            if (renderedCards === totalCards) {
                break
            }

            if (renderedCards < folders.length) {
                const nextFolder = folders[renderedCards]
                nextCard = (
                    <PinnedFolderCard
                        folder={nextFolder}
                        key={nextFolder.path.join("")}
                    />
                )
            } else {
                const nextFile = files[renderedCards - folders.length]
                nextCard = <PinnedFileCard file={nextFile} key={nextFile.id} />
            }

            cards.push(nextCard)
            renderedCards++
        }

        return cards
    }

    if (parentWidth === 0) {
        return null
    }

    function renderContent() {
        if (loading) {
            return <Loading />
        }

        if (files.length === 0 && folders.length === 0) {
            return <NoContent />
        }

        return (
            <SwiperComponent
                onSwiper={setSwiper}
                slidesPerView={1}
                className={styles.swiper}
            >
                {new Array(totalSlides).fill(0).map((_, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.slideContainer}>
                            {nextSlide()}
                        </div>
                    </SwiperSlide>
                ))}
            </SwiperComponent>
        )
    }

    return (
        <>
            <SwiperHeader swiper={swiper} />
            {renderContent()}
        </>
    )
}

