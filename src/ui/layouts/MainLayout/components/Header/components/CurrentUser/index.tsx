import Popover from "@/ui/shared/Popover"

import avatarUrl from "@/assets/images/avatar.png"
import styles from "./styles.module.scss"
import ConfigurationMenu from "@/ui/layouts/MainLayout/components/Header/components/CurrentUser/components/ConfigurationMenu"

export default function CurrentUser() {
    return (
        <Popover
            renderTrigger={() => (
                <div className={styles.currentUserContainer}>
                    <div className={styles.usernameWrapper}>Current User</div>
                    <img src={avatarUrl} className="" />
                </div>
            )}
            renderContent={() => <ConfigurationMenu />}
        />
    )
}

