import Popover from "@/ui/shared/Popover"

import avatarUrl from "@/assets/images/avatar.png"
import styles from "./styles.module.scss"
import ConfigurationMenu from "@/ui/layouts/MainLayout/components/Header/components/CurrentUser/components/ConfigurationMenu"
import { useTranslation } from "react-i18next"

export default function CurrentUser() {
    const { t } = useTranslation("common")

    return (
        <Popover
            renderTrigger={() => (
                <div className={styles.currentUserContainer}>
                    <div className={styles.usernameWrapper}>
                        {t("currentUser.title")}
                    </div>
                    <img src={avatarUrl} />
                </div>
            )}
            renderContent={() => <ConfigurationMenu />}
        />
    )
}

