import { Fragment } from "react/jsx-runtime"
import styles from "./styles.module.scss"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"

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
                        <Icon
                            name={IconName.ChevronRight}
                            className={styles.separator}
                        />
                    )}
                </Fragment>
            ))}
        </nav>
    )
}

