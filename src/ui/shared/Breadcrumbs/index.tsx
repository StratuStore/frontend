import { Fragment } from "react/jsx-runtime"
import styles from "./styles.module.scss"

interface BreadcrumbsProps {
    items: string[]
    onItemClick?: (item: string) => void
}

export default function Breadcrumbs({
    items,
    onItemClick,
}: BreadcrumbsProps): JSX.Element {
    return (
        <nav className={styles.breadcrumbs}>
            {items.map((item, index) => (
                <Fragment key={item}>
                    <span
                        className={styles.breadcrumb}
                        onClick={() => onItemClick && onItemClick(item)}
                    >
                        {item}
                    </span>
                    {index < items.length - 1 && (
                        <span className={styles.separator}>/</span>
                    )}
                </Fragment>
            ))}
        </nav>
    )
}

