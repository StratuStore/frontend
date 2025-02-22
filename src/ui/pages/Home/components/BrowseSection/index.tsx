import Breadcrumbs from "@/ui/shared/Breadcrumbs"
import styles from "./styles.module.scss"

export default function BrowseSection() {
    return (
        <>
            <div className={styles.headerWrapper}>
                <h2 className={styles.header}>Browse</h2>
            </div>
            <div className={styles.breadcrumbsWrapper}>
                <Breadcrumbs items={["Home", "Browse"]} />
            </div>
            <div>Table</div>
        </>
    )
}

