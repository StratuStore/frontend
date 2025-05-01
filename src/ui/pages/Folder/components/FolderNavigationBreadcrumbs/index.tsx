import { folderStore } from "@/entities/Folder/store"
import Breadcrumbs from "@/ui/shared/Breadcrumbs"
import { useNavigate } from "react-router"

export default function FolderNavigationBreadcrumbs() {
    const currentFolder = folderStore.currentFolder
    const navigate = useNavigate()

    if (!currentFolder) {
        return null
    }

    async function onSegmentClick(segment: string) {
        if (!currentFolder) {
            return
        }

        if (segment === "root") {
            navigate("/")
            return
        }

        const folder = await folderStore.navigateByPath([
            ...currentFolder.path.slice(
                0,
                currentFolder.path.indexOf(segment) + 1
            ),
        ])

        if (!folder) {
            navigate("/not-found")
            return
        }

        navigate(`/folder/${folder.id}`)
    }

    return (
        <Breadcrumbs
            segments={currentFolder.path}
            onSegmentClick={onSegmentClick}
        />
    )
}

