import Icon from "@/ui/shared/Icon"
import styles from "./styles.module.scss"
import { IconName } from "@/ui/shared/Icon/types"

export type FolderBadgeProps = {
    name: string
}

export default function FolderBadge({ name }: FolderBadgeProps) {
    return (
        <div className={styles.folderBadgeWrapper}>
            <span className={styles.iconWrapper}>
                <Icon
                    name={IconName.Folder}
                    className={styles.icon}
                    width="16px"
                    height="16px"
                />
            </span>
            {name}
        </div>
    )
}

