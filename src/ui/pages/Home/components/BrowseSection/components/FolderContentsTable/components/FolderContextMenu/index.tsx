import { useFolderContextMenuItems } from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/components/FolderContextMenu/hooks/useFolderContextMenuItems"
import ContextMenu from "@/ui/shared/ContextMenu"
import { observer } from "mobx-react-lite"

export type FolderContextMenuProps = {
    children: React.ReactNode
    disabled?: boolean
}

function FolderContentsContextMenuComponent({
    children,
    disabled = false,
}: FolderContextMenuProps) {
    const items = useFolderContextMenuItems()

    if (disabled) {
        return <>{children}</>
    }

    return <ContextMenu groups={items}>{children}</ContextMenu>
}

const FolderContentsContextMenu = observer(FolderContentsContextMenuComponent)
export default FolderContentsContextMenu

