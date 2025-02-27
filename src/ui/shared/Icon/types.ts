export enum IconName {
    Folder = "folder",
    InformationOutline = "information-outline",
    LockOutline = "lock-outline",
    Magnify = "magnify",
    TrayArrowDown = "tray-arrow-down",
    ShareVariant = "share-variant",
    WindowClose = "window-close",
    ChevronDown = "chevron-down",
    ChevronLeft = "chevron-left",
    ChevronRight = "chevron-right",
    CogOutline = "cog-outline",
    ContentCopy = "content-copy",
    Filter = "filter",
    Check = "check",
}

export interface IconProps {
    name: IconName
    width?: string
    height?: string
    className?: string
}

