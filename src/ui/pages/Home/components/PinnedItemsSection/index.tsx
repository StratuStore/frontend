import { useRef } from "react"
import { useElementSize } from "@reactuses/core"

import PinnedItemsSwiper from "@/ui/pages/Home/components/PinnedItemsSection/components/PinnedItemsSwiper"
import { Folder } from "@/entities/Folder"

const mockFolders: Folder[] = []

for (let i = 0; i < 100; i++) {
    mockFolders.push({
        path: [`folder${i}`],
        files: [],
    })
}

export default function PinnedItemsSection() {
    const sectionContainerRef = useRef<HTMLDivElement | null>(null)
    const [sectionWidth] = useElementSize(sectionContainerRef)

    return (
        <div ref={sectionContainerRef} style={{ display: "grid" }}>
            <PinnedItemsSwiper
                parentWidth={sectionWidth}
                folders={mockFolders}
                files={[]}
            />
        </div>
    )
}

