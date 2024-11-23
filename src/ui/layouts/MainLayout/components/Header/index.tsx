import CurrentUser from "@/ui/layouts/MainLayout/components/Header/components/CurrentUser"
import SearchInput from "@/ui/layouts/MainLayout/components/Header/components/SearchInput"

import styles from "./styles.module.scss"

export default function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.searchInputWrapper}>
                <SearchInput />
            </div>
            <CurrentUser />
        </div>
    )
}

