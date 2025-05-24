import CurrentUser from "@/ui/layouts/MainLayout/components/Header/components/CurrentUser"
import SearchInput from "@/ui/layouts/MainLayout/components/Header/components/SearchInput"

import styles from "./styles.module.scss"
import QuickActions from "./components/QuickActions"

export default function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.searchInputWrapper}>
                <SearchInput />
            </div>

            <div className={styles.quickActionsWrapper}>
                <QuickActions />
            </div>

            <CurrentUser />
        </div>
    )
}

