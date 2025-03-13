import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import styles from "./styles.module.scss"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import clsx from "clsx"

export type CheckboxProps = ComponentPropsWithoutRef<
    typeof CheckboxPrimitive.Root
> & {
    onChange?: (checked: boolean) => void
    name?: string
}

const Checkbox = forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxProps
>(({ className, onChange, name, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={clsx(styles.checkbox, className)}
        onCheckedChange={(checked) => {
            onChange?.(!!checked)
        }}
        name={name}
        {...props}
    >
        <CheckboxPrimitive.Indicator className={styles.indicator}>
            <Icon name={IconName.Check} width="1rem" height="1rem" />
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
))

Checkbox.displayName = "Checkbox"

export { Checkbox }

