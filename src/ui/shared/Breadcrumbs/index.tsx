import { Fragment } from "react/jsx-runtime"
import styles from "./styles.module.scss"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"

interface BreadcrumbsProps {
    segments: string[]
    onSegmentClick?: (segment: string) => void
}

export default function Breadcrumbs({
    segments,
    onSegmentClick,
}: BreadcrumbsProps): JSX.Element {
    return (
        <nav className={styles.breadcrumbs}>
            {segments.map((segment, index) => (
                <Fragment key={segment}>
                    <span
                        className={styles.breadcrumb}
                        onClick={() =>
                            onSegmentClick && onSegmentClick(segment)
                        }
                    >
                        {segment}
                    </span>
                    {index < segments.length - 1 && (
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

