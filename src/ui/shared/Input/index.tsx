import clsx from "clsx"

import styles from "./styles.module.scss"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    prependInner?: React.ReactNode
    appendInner?: React.ReactNode
    wrapperClasses?: string
    inputClasses?: string
}

export default function Input({
    prependInner,
    appendInner,
    wrapperClasses,
    inputClasses,
    ...props
}: InputProps) {
    return (
        <div className={clsx(wrapperClasses, styles.wrapper)}>
            {prependInner && (
                <span className={styles.inner}>{prependInner}</span>
            )}
            <input className={clsx(styles.input, inputClasses)} {...props} />
            {appendInner && <span className={styles.inner}>{appendInner}</span>}
        </div>
    )
}

