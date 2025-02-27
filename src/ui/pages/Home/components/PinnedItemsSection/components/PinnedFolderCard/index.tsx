import { Folder } from "@/types/models/Folder"
import PinnedItemCard from "@/ui/pages/Home/components/PinnedItemsSection/components/PinnedItemCard"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import styles from "./styles.module.scss"

export type PinnedFolderCardProps = {
    folder: Folder
}

export default function PinnedFolderCard({ folder }: PinnedFolderCardProps) {
    return (
        <PinnedItemCard
            icon={
                <Icon
                    name={IconName.Folder}
                    width="45px"
                    height="45px"
                    className={styles.folderIcon}
                />
            }
            name={folder.path.at(-1)!}
        />
    )
}

