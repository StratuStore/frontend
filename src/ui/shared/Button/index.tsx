import clsx from "clsx"
import { forwardRef } from "react"

import styles from "./styles.module.scss"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost" | "icon" | "outline"
    size?: "default" | "small"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { children, variant = "primary", size = "default", className, ...rest },
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
            },
            className
        )

        return (
            <button {...rest} ref={ref} className={classes}>
                {children}
            </button>
        )
    }
)

Button.displayName = "Button"

export default Button

