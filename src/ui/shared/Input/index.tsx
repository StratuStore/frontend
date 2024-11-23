import clsx from "clsx"

import styles from "./styles.module.scss"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    prependInner?: React.ReactNode
    appendInner?: React.ReactNode
}

export default function Input({
    prependInner,
    appendInner,
    className,
    ...props
}: InputProps) {
    return (
        <div className={clsx(className, styles.wrapper)}>
            {prependInner && (
                <span className={styles.inner}>{prependInner}</span>
            )}
            <input className={styles.input} {...props} />
            {appendInner && <span className={styles.inner}>{appendInner}</span>}
        </div>
    )
}

