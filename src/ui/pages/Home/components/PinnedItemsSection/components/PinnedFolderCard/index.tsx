import { mdiFolder } from "@mdi/js"

import { Folder } from "@/types/models/Folder"
import PinnedItemCard from "@/ui/pages/Home/components/PinnedItemsSection/components/PinnedItemCard"
import Icon from "@mdi/react"

export type PinnedFolderCardProps = {
    folder: Folder
}

export default function PinnedFolderCard({ folder }: PinnedFolderCardProps) {
    return (
        <PinnedItemCard
            icon={<Icon path={mdiFolder} size="43px" />}
            name={folder.path.at(-1)!}
        />
    )
}

