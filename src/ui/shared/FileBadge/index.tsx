import Icon from "@/ui/shared/Icon"
import styles from "./styles.module.scss"
import { IconName } from "@/ui/shared/Icon/types"

export type FileBadgeProps = {
    name: string
}

export default function FileBadge({ name }: FileBadgeProps) {
    return (
        <div className={styles.fileBadgeWrapper}>
            <span className={styles.iconWrapper}>
                <Icon
                    name={IconName.File}
                    className={styles.icon}
                    width="16px"
                    height="16px"
                />
            </span>
            <span className={styles.name} title={name}>
                {name}
            </span>
        </div>
    )
}

