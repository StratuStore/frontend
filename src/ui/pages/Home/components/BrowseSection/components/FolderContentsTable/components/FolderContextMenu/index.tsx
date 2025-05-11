import { useFolderContextMenuItems } from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable/components/FolderContextMenu/hooks/useFolderContextMenuItems"
import ContextMenu from "@/ui/shared/ContextMenu"
import { observer } from "mobx-react-lite"

export type FolderContextMenuProps = {
    children: React.ReactNode
}

function FolderContentsContextMenuComponent({
    children,
}: FolderContextMenuProps) {
    const items = useFolderContextMenuItems()

    return <ContextMenu groups={items}>{children}</ContextMenu>
}

const FolderContentsContextMenu = observer(FolderContentsContextMenuComponent)
export default FolderContentsContextMenu

