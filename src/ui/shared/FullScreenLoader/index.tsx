import Spinner from "@/ui/shared/Spinner"
import styles from "./styles.module.scss"

export default function FullSreenLoader() {
    return (
        <div className={styles.loaderContainer}>
            <Spinner width="64px" height="64px" />
        </div>
    )
}
