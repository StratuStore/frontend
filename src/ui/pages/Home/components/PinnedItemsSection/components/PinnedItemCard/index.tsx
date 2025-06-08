import { ReactNode } from "react"

import styles from "./styles.module.scss"

export type PinnedItemCardProps = {
    name: string
    icon: ReactNode
    onClick?: () => void
}

export default function PinnedItemCard({
    name,
    icon,
    onClick,
}: PinnedItemCardProps) {
    return (
        <div className={styles.pinnedItemCard} onClick={onClick}>
            <div>{icon}</div>
            <div>{name}</div>
        </div>
    )
}

