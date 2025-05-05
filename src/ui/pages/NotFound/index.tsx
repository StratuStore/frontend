import Button from "@/ui/shared/Button"
import styles from "./styles.module.scss"
import { useNavigate } from "react-router"

export default function NotFoundPage() {
    const navigate = useNavigate()

    return (
        <div className={styles.notFoundWrapper}>
            <div className={styles.errorCode}>404.</div>

            <div className={styles.title}>
                We don't even know how you got there
            </div>

            <div className={styles.subtitle}>But we can take you back home</div>

            <Button onClick={() => navigate("/")}>Mom, I'm scared</Button>
        </div>
    )
}

