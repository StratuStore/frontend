import { Folder } from "@/entities/Folder"
import PinnedItemCard from "@/ui/pages/Home/components/PinnedItemsSection/components/PinnedItemCard"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import styles from "./styles.module.scss"
import { useNavigate } from "react-router"

export type PinnedFolderCardProps = {
    folder: Folder
}

export default function PinnedFolderCard({ folder }: PinnedFolderCardProps) {
    const navigate = useNavigate()

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
            name={folder.name}
            onClick={() => navigate(`/folder/${folder.id}`)}
        />
    )
}

