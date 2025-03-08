import Button from "@/ui/shared/Button"
import styles from "./styles.module.scss"
import { IconName } from "@/ui/shared/Icon/types"
import Icon from "@/ui/shared/Icon"
import { useState } from "react"
import toast from "react-hot-toast"

type User = {
    id: number
    email: string
    name: string
    avatarUrl: string
}

export type UserEntryProps = {
    user: User
}

export default function UserEntry({ user }: UserEntryProps) {
    const [isDeleting, setDeleting] = useState<boolean>(false)

    function handleUserDelete() {
        setDeleting(false)
        toast.loading("User removed successfully")
    }

    return (
        <div key={user.id} className={styles.userEntryWrapper}>
            <div className={styles.userInfoWrapper}>
                <img className={styles.userAvatar} src={user.avatarUrl} />
                <p className={styles.userEmail}>{user.email}</p>
            </div>
            <div className={styles.userControlsWrapper}>
                {isDeleting ? (
                    <div>
                        <Button
                            variant="icon"
                            className={styles.removeButton}
                            onClick={() => setDeleting(false)}
                        >
                            <Icon
                                name={IconName.WindowClose}
                                width="20px"
                                height="20px"
                            />
                        </Button>
                        <Button
                            variant="icon"
                            className={styles.removeButton}
                            onClick={() => handleUserDelete()}
                        >
                            <Icon
                                name={IconName.Check}
                                width="20px"
                                height="20px"
                            />
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="icon"
                        className={styles.removeButton}
                        onClick={() => setDeleting(true)}
                    >
                        <Icon
                            name={IconName.Trash}
                            width="20px"
                            height="20px"
                        />
                    </Button>
                )}
            </div>
        </div>
    )
}

