export enum IconName {
    Folder = "folder",
    File = "file",
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
    Trash = "trash",
    UploadCloud = "upload-cloud",
    ClockOutline = "clock-outline",
    CloudStorage = "cloud-storage",
    Creation = "creation",
    Spinner = "spinner",
}

export interface IconProps {
    name: IconName
    width?: string
    height?: string
    className?: string
}

