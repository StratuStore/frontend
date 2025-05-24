import styles from "./styles.module.scss"
import ThemePicker from "./components/ThemePicker"
import LanguagePicker from "./components/LanguagePicker"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react-lite"
import { TEST_HEADER } from "@/shared/constants/tests/header"

function ConfigurationMenuComponent() {
    const { t } = useTranslation("common")

    return (
        <div
            className={styles.configurationMenuWrapper}
            data-testid={TEST_HEADER.ConfigurationMenu}
        >
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
        </div>
    )
}

const ConfigurationMenu = observer(ConfigurationMenuComponent)
export default ConfigurationMenu

