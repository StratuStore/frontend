import { File } from "@/entities/File"
import PinnedItemCard from "@/ui/pages/Home/components/PinnedItemsSection/components/PinnedItemCard"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import styles from "./styles.module.scss"
import { folderStore } from "@/entities/Folder/store"
import { observer } from "mobx-react-lite"
import { fileStore } from "@/entities/File/store"

export type PinnedFileCardProps = {
    file: File
}

function PinnedFileCardComponent({ file }: PinnedFileCardProps) {
    return (
        <PinnedItemCard
            icon={
                <Icon
                    name={IconName.File}
                    width="45px"
                    height="45px"
                    className={styles.fileIcon}
                />
            }
            name={file.name}
            onClick={() => {
                fileStore.forceSelectFile(file)
                folderStore.setIsDocumentPreviewOpen(true)
            }}
        />
    )
}

const PinnedFileCard = observer(PinnedFileCardComponent)
export default PinnedFileCard

