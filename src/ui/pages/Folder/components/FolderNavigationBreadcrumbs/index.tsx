import { folderStore } from "@/entities/Folder/store"
import Breadcrumbs from "@/ui/shared/Breadcrumbs"
import { observer } from "mobx-react-lite"
import { useMemo } from "react"
import { useNavigate } from "react-router"

function FolderNavigationBreadcrumbsComponent() {
    const currentFolder = folderStore.currentFolder
    const navigate = useNavigate()

    const segments = useMemo(() => {
        if (!currentFolder) {
            return []
        }

        const segments = currentFolder.path.map((segment) => segment.name)
        return segments
    }, [currentFolder])

    async function onSegmentClick(index: number) {
        if (!currentFolder) {
            return
        }

        folderStore.setIsCurrentFolderReady(false)

        if (index === 0) {
            navigate("/")
            return
        }

        navigate(`/folder/${currentFolder.path[index].id}`)
    }

    if (!currentFolder) {
        return null
    }

    return <Breadcrumbs segments={segments} onSegmentClick={onSegmentClick} />
}

const FolderNavigationBreadcrumbs = observer(
    FolderNavigationBreadcrumbsComponent
)
export default FolderNavigationBreadcrumbs

