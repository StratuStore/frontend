import styles from "./styles.module.scss"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    prependInner?: React.ReactNode
    appendInner?: React.ReactNode
}

export function Input({ prependInner, appendInner, ...props }: InputProps) {
    return (
        <div className={styles.wrapper}>
            {prependInner && (
                <span className={styles.inner}>{prependInner}</span>
            )}
            <input className={styles.input} {...props} />
            {appendInner && <span className={styles.inner}>{appendInner}</span>}
        </div>
    )
}

