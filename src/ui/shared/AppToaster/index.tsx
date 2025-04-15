import { Toaster } from "react-hot-toast"
import styles from "./styles.module.scss"
import clsx from "clsx"

export default function AppToaster() {
    return (
        <Toaster
            toastOptions={{
                className: clsx(styles.toast, styles.toast),
            }}
            position="bottom-right"
        />
    )
}

