import UserEntry from "@/ui/shared/Modals/FileAceesSettingsModal/components/ShareByEmailSection/components/UserEntry"
import styles from "./styles.module.scss"
import avatarUrl from "@/assets/images/avatar.png"

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
    {
        id: 4,
        email: "email4@email.com",
        name: "User 4",
        avatarUrl: avatarUrl,
    },
    {
        id: 5,
        email: "email5@email.com",
        name: "User 5",
        avatarUrl: avatarUrl,
    },
]

export default function UsersWithAccessList() {
    return (
        <div className={styles.usersWithAccessWrapper}>
            {mockUsersWithAccess.map((user) => (
                <UserEntry key={user.id} user={user} />
            ))}
        </div>
    )
}

