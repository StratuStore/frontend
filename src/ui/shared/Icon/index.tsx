import { Icon as MdiIcon } from "@mdi/react"
import { IconProps as MdiIconProps } from "@mdi/react/dist/IconProps"
import { mdiChevronLeft, mdiChevronRight, mdiFolder } from "@mdi/js"

import { IconName } from "@/ui/shared/Icon/types"

const iconPaths: Record<IconName, string> = {
    [IconName.Folder]: mdiFolder,
    [IconName.ChevronLeft]: mdiChevronLeft,
    [IconName.ChevronRight]: mdiChevronRight,
}

export type IconProps = Omit<MdiIconProps, "path"> & {
    name: IconName
}

export default function Icon({ name, ...rest }: IconProps) {
    return <MdiIcon path={iconPaths[name]} {...rest} />
}

