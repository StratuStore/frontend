import React from "react"
import styles from "./styles.module.scss"

enum TypographyVariant {
    XXS = "xxs",
    XS = "xs",
    SM = "sm",
    MD = "md",
    LG = "lg",
}

enum TypographyWeight {
    Light = "light",
    Normal = "normal",
    SemiBold = "semi-bold",
    Bold = "bold",
}

enum TypographyColor {
    Text = "text",
    Accent = "accent",
}

interface TypographyProps {
    variant: TypographyVariant
    weight?: TypographyWeight
    color?: TypographyColor
    children: React.ReactNode
}

const Typography: React.FC<TypographyProps> = ({
    variant,
    weight = TypographyWeight.Normal,
    color = TypographyColor.Text,
    children,
}) => {
    return (
        <span
            className={`${styles[variant]} ${styles[weight]} ${styles[color]}`}
        >
            {children}
        </span>
    )
}

export { TypographyVariant, TypographyWeight, TypographyColor }
export default Typography

