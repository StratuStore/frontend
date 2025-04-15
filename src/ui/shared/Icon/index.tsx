import clsx from "clsx"
import spritesheetPath from "@/assets/icons/spritesheet.svg"
import { IconProps } from "./types"
import styles from "./styles.module.scss"

export default function Icon({
    name,
    width = "1em",
    height = "1em",
    className = "",
}: IconProps) {
    const iconClasses = clsx(styles.icon, className)

    return (
        <svg className={iconClasses} style={{ width, height }}>
            <use xlinkHref={`${spritesheetPath}#${name}`} />
        </svg>
    )
}

