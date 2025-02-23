import Button from "@/ui/shared/Button"

import styles from "./styles.module.scss"
import ThemePicker from "@/ui/layouts/MainLayout/components/Header/components/CurrentUser/components/ConfigurationMenu/components/ThemePicker"
import LanguagePicker from "@/ui/layouts/MainLayout/components/Header/components/CurrentUser/components/ConfigurationMenu/components/LanguagePicker"

export default function ConfigurationMenu() {
    return (
        <div className={styles.configurationMenuWrapper}>
            <div className={styles.configurationMenuSection}>
                <p className={styles.configurationMenuSectionHeader}>Theme</p>
                <ThemePicker />
            </div>

            <div className={styles.configurationMenuSection}>
                <p className={styles.configurationMenuSectionHeader}>
                    Language
                </p>
                <LanguagePicker />
            </div>

            <Button className={styles.logoutButton}>Logout</Button>
        </div>
    )
}

