import { useTranslation } from "react-i18next"
import styles from "./styles.module.scss"

export default function NoContent() {
    const { t } = useTranslation("home")

    return (
        <div className={styles.noContent}>
            {t("pinnedItemsSection.noContent")}
        </div>
    )
}

