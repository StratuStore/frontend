import clsx from "clsx"

import styles from "./styles.module.scss"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost" | "icon"
}

export default function Button({
    children,
    variant = "primary",
    className,
    ...rest
}: ButtonProps) {
    const classes = clsx(
        styles.button,
        {
            [styles.primary]: variant === "primary",
            [styles.ghost]: variant === "ghost",
            [styles.icon]: variant === "icon",
        },
        className
    )

    return (
        <button {...rest} className={classes}>
            {children}
        </button>
    )
}

