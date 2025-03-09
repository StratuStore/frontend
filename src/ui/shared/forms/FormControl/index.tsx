import { ReactNode } from "react"
import styles from "./styles.module.scss"
import { createPortal } from "react-dom"

export type FormControlProps = {
    control: ReactNode
    error?: string
    errorMessageRoot: HTMLElement | null
}

export default function FormControl({
    control,
    error,
    errorMessageRoot,
}: FormControlProps) {
    const errorMessage = <p className={styles.errorMessage}>{error}</p>

    return (
        <div className={styles.formControlWrapper}>
            {control}
            {error &&
                (errorMessageRoot
                    ? createPortal(errorMessage, errorMessageRoot)
                    : errorMessage)}
        </div>
    )
}

