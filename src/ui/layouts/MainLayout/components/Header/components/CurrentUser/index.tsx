import styles from "./styles.module.scss"
import { observer } from "mobx-react-lite"
import { authStore } from "@/entities/Auth/store"

function CurrentUserComponent() {
    const user = authStore.user

    if (!user) {
        return null
    }

    return (
        <div className={styles.currentUserContainer}>
            <div className={styles.usernameWrapper}>{user.name}</div>
            <img
                src={user.picture}
                className={styles.avatar}
                referrerPolicy="no-referrer"
            />
        </div>
    )
}

const CurrentUser = observer(CurrentUserComponent)
export default CurrentUser

