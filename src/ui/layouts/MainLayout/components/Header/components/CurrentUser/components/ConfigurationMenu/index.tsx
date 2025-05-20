import Button from "@/ui/shared/Button"

import styles from "./styles.module.scss"
import ThemePicker from "@/ui/layouts/MainLayout/components/Header/components/CurrentUser/components/ConfigurationMenu/components/ThemePicker"
import LanguagePicker from "@/ui/layouts/MainLayout/components/Header/components/CurrentUser/components/ConfigurationMenu/components/LanguagePicker"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react-lite"
import { authStore } from "@/entities/Auth/store"
import { useNavigate } from "react-router"

function ConfigurationMenuComponent() {
    const { t } = useTranslation("common")
    const navigate = useNavigate()

    async function handleLogout() {
        await authStore.logout()
        navigate("/auth")
    }

    return (
        <div className={styles.configurationMenuWrapper}>
            <div className={styles.configurationMenuSection}>
                <p className={styles.configurationMenuSectionHeader}>
                    {t("configurationMenu.themePicker")}
                </p>
                <ThemePicker />
            </div>

            <div className={styles.configurationMenuSection}>
                <p className={styles.configurationMenuSectionHeader}>
                    {t("configurationMenu.languagePicker")}
                </p>
                <LanguagePicker />
            </div>

            <Button
                className={styles.logoutButton}
                onClick={handleLogout}
                loading={authStore.isLoading}
            >
                {t("configurationMenu.logout")}
            </Button>
        </div>
    )
}

const ConfigurationMenu = observer(ConfigurationMenuComponent)
export default ConfigurationMenu

