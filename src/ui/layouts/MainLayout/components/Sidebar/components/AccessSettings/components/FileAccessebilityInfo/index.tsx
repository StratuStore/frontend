import { FileAccessebilityStatus } from "./types"
import styles from "./styles.module.scss"
import avatarUrl from "@/assets/images/avatar.png"

export type FileAccessebilityStatusProps = {
    status: FileAccessebilityStatus
}

type User = {
    id: number
    email: string
    name: string
    avatarUrl: string
}

const mockUsersWithAccess: User[] = [
    {
        id: 1,
        email: "email1@email.com",
        name: "User 1",
        avatarUrl: avatarUrl,
    },
    {
        id: 2,
        email: "email2@email.com",
        name: "User 2",
        avatarUrl: avatarUrl,
    },
    {
        id: 3,
        email: "email3@email.com",
        name: "User 3",
        avatarUrl: avatarUrl,
    },
]

export default function FileAccessebilityInfo({
    status,
}: FileAccessebilityStatusProps) {
    switch (status) {
        case FileAccessebilityStatus.Private:
            return (
                <p className={styles.accessebilityStatusDescription}>
                    This file is private to you.
                </p>
            )

        case FileAccessebilityStatus.Restricted:
            return (
                <div className={styles.restrictedWrapper}>
                    <p className={styles.accessebilityStatusDescription}>
                        This file is also accessible to:
                    </p>
                    <div className={styles.usersWithAccessWrapper}>
                        {mockUsersWithAccess.map((user) => (
                            <UserEntry key={user.id} user={user} />
                        ))}
                    </div>
                </div>
            )

        case FileAccessebilityStatus.Public:
            return (
                <p className={styles.accessebilityStatusDescription}>
                    Anyone with the link can access this file.
                </p>
            )
    }
}

function UserEntry({ user }: { user: User }) {
    return (
        <div className={styles.userEntryWrapper}>
            <img src={user.avatarUrl} className={styles.userAvatar} />
            <p className={styles.userInfo}>{user.email}</p>
        </div>
    )
}

