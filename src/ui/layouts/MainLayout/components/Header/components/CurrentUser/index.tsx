import Popover from "@/ui/shared/Popover"

import styles from "./styles.module.scss"
import ConfigurationMenu from "@/ui/layouts/MainLayout/components/Header/components/CurrentUser/components/ConfigurationMenu"
import { observer } from "mobx-react-lite"
import { authStore } from "@/entities/Auth/store"

function CurrentUserComponent() {
    const user = authStore.user

    if (!user) {
        return null
    }

    console.log(user)

    return (
        <Popover
            renderTrigger={() => (
                <div className={styles.currentUserContainer}>
                    <div className={styles.usernameWrapper}>{user.name}</div>
                    <img src={user.picture} className={styles.avatar} />
                </div>
            )}
            renderContent={() => <ConfigurationMenu />}
        />
    )
}

const CurrentUser = observer(CurrentUserComponent)
export default CurrentUser

