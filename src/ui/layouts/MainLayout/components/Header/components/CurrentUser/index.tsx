import avatarUrl from "@/assets/images/avatar.png"

import styles from "./styles.module.scss"

export default function CurrentUser() {
    return (
        <div className={styles.currentUserContainer}>
            <div className={styles.usernameWrapper}>Current User</div>
            <img src={avatarUrl} className=""></img>
        </div>
    )
}

