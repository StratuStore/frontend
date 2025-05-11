import Icon from "@/ui/shared/Icon"
import styles from "./styles.module.scss"
import { IconName } from "@/ui/shared/Icon/types"
import clsx from "clsx"

export type SpinnerProps = {
    width?: string
    height?: string
    className?: string
}

export default function Spinner(props: SpinnerProps) {
    const { className, ...rest } = props
    return (
        <Icon
            name={IconName.Spinner}
            className={clsx(styles.spinner, className)}
            {...rest}
        />
    )
}

