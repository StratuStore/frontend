import clsx from "clsx"
import { forwardRef } from "react"

import styles from "./styles.module.scss"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    prependInner?: React.ReactNode
    appendInner?: React.ReactNode
    wrapperClasses?: string
    inputClasses?: string
    touched?: boolean
    valid?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            prependInner,
            appendInner,
            wrapperClasses,
            inputClasses,
            touched,
            valid,
            ...props
        },
        ref
    ) => {
        console.log("Input render", touched, valid)

        return (
            <div className={clsx(wrapperClasses, styles.wrapper)}>
                {prependInner && (
                    <span className={styles.inner}>{prependInner}</span>
                )}
                <input
                    ref={ref}
                    className={clsx(
                        styles.input,
                        {
                            [styles.valid]: touched && valid,
                            [styles.invalid]: touched && !valid,
                        },
                        inputClasses
                    )}
                    {...props}
                />
                {appendInner && (
                    <span className={styles.inner}>{appendInner}</span>
                )}
            </div>
        )
    }
)

Input.displayName = "Input"

export default Input

