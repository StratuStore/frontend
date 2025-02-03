import { ReactNode } from "react"

import styles from "./styles.module.scss"

export type PinnedItemCardProps = {
    name: string
    icon: ReactNode
}

export default function PinnedItemCard({ name, icon }: PinnedItemCardProps) {
    return (
        <div className={styles.pinnedItemCard}>
            <div>{icon}</div>
            <div>{name}</div>
        </div>
    )
}

