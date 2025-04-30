import Skeleton from "@/ui/shared/Skeleton"
import styles from "./styles.module.scss"

export default function Loader() {
    return (
        <div className={styles.loaderWrapper}>
            <Skeleton />
        </div>
    )
}

