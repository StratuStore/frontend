import React from "react"
import styles from "./styles.module.scss"

interface BreadcrumbsProps {
    items: string[]
    onItemClick?: (item: string) => void
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onItemClick }) => {
    return (
        <nav className={styles.breadcrumbs}>
            {items.map((item, index) => (
                <>
                    <span
                        key={index}
                        className={styles.breadcrumb}
                        onClick={() => onItemClick && onItemClick(item)}
                    >
                        {item}
                    </span>
                    {index < items.length - 1 && (
                        <span className={styles.separator}>/</span>
                    )}
                </>
            ))}
        </nav>
    )
}

export default Breadcrumbs

