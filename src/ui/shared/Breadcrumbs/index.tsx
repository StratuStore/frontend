import { Fragment } from "react/jsx-runtime"
import styles from "./styles.module.scss"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import { TEST_IDS } from "@/shared/constants/tests/shared"

interface BreadcrumbsProps {
    segments: string[]
    onSegmentClick?: (segment: string) => void
}

export default function Breadcrumbs({
    segments,
    onSegmentClick,
}: BreadcrumbsProps): JSX.Element {
    return (
        <nav className={styles.breadcrumbs} data-testid={TEST_IDS.Breadcrumbs}>
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

