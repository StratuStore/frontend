import { useEffect, useRef } from "react"
import { useElementSize } from "@reactuses/core"

import PinnedItemsSwiper from "@/ui/pages/Home/components/PinnedItemsSection/components/PinnedItemsSwiper"
import { folderStore } from "@/entities/Folder/store"
import { observer } from "mobx-react-lite"

function PinnedItemsSectionComponent() {
    const sectionContainerRef = useRef<HTMLDivElement | null>(null)
    const [sectionWidth] = useElementSize(sectionContainerRef)

    useEffect(() => {
        folderStore.getPinnedFiles()
    }, [])

    return (
        <div ref={sectionContainerRef} style={{ display: "grid" }}>
            <PinnedItemsSwiper
                parentWidth={sectionWidth}
                folders={folderStore.sharedFolders}
                files={folderStore.sharedFiles}
                loading={folderStore.isSharedLoading}
            />
        </div>
    )
}

const PinnedItemsSection = observer(PinnedItemsSectionComponent)
export default PinnedItemsSection

