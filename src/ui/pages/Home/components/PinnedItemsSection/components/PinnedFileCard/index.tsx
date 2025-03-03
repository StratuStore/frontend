import { mdiFolder } from "@mdi/js"

import { File } from "@/entities/File"
import PinnedItemCard from "@/ui/pages/Home/components/PinnedItemsSection/components/PinnedItemCard"

export type PinnedFileCardProps = {
    file: File
}

export default function PinnedFileCard({ file }: PinnedFileCardProps) {
    return <PinnedItemCard icon={mdiFolder} name={file.name} />
}

