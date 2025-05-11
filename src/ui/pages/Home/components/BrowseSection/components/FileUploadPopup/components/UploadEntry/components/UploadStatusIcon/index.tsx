import { FileUploadStatus } from "@/entities/FileUpload"
import Icon from "@/ui/shared/Icon"
import { IconName, IconProps } from "@/ui/shared/Icon/types"

export type UploadStatusIconProps = {
    status: FileUploadStatus
    iconProps?: Partial<IconProps>
}

export default function UploadStatusIcon({
    status,
    iconProps,
}: UploadStatusIconProps) {
    switch (status) {
        case FileUploadStatus.Pending:
            return <Icon {...iconProps} name={IconName.ClockOutline} />
        case FileUploadStatus.InProgress:
            return <Icon {...iconProps} name={IconName.UploadCloud} />
        case FileUploadStatus.Successful:
            return <Icon {...iconProps} name={IconName.Check} />
        case FileUploadStatus.Failed:
            return <Icon {...iconProps} name={IconName.WindowClose} />
    }
}

