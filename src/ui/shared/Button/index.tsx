import clsx from "clsx"
import { forwardRef } from "react"

import styles from "./styles.module.scss"
import Spinner from "@/ui/shared/Spinner"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost" | "icon" | "outline"
    size?: "default" | "small"
    loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = "primary",
            size = "default",
            className,
            loading = false,
            disabled,
            ...rest
        },
        ref
    ) => {
        const classes = clsx(
            styles.button,
            {
                [styles.primary]: variant === "primary",
                [styles.ghost]: variant === "ghost",
                [styles.icon]: variant === "icon",
                [styles.outline]: variant === "outline",
                [styles.small]: size === "small",
                [styles.loading]: loading,
            },
            className
        )

        return (
            <button
                {...rest}
                ref={ref}
                className={classes}
                disabled={disabled || loading}
            >
                {loading ? (
                    <>
                        <span className={styles.loaderContainer}>
                            <Spinner />
                        </span>

                        {children && (
                            <span className={styles.hiddenContent}>
                                {children}
                            </span>
                        )}
                    </>
                ) : (
                    children
                )}
            </button>
        )
    }
)

Button.displayName = "Button"

export default Button

