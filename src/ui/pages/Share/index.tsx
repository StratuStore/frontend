import { fileStore } from "@/entities/File/store"
import FullSreenLoader from "@/ui/shared/FullScreenLoader"
import FilePreviewModal from "@/ui/shared/Modals/FilePreviewModal"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

function SharePageComponent() {
    const { id } = useParams()
    const sharedFile = fileStore.sharedFile
    const isSharedFileLoading = fileStore.isSharedFileLoading
    const [isSharedFileLoaded, setIsSharedFileLoaded] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!id) {
            navigate("/")
            return
        }

        if (!isSharedFileLoaded) {
            fileStore
                .loadSharedFile(id)
                .then(() => {
                    setIsSharedFileLoaded(true)
                })
                .catch(() => {
                    navigate("/")
                })
        }
    }, [id, navigate, isSharedFileLoaded])

    if (isSharedFileLoading) {
        return <FullSreenLoader />
    }

    if (isSharedFileLoaded && !sharedFile) {
        return null
    }

    return (
        <FilePreviewModal
            file={sharedFile ?? undefined}
            open={true}
            isSharedFile={true}
            closeModal={() => {
                fileStore.setSharedFile(null)
                navigate("/")
            }}
        />
    )
}

const SharePage = observer(SharePageComponent)
export default SharePage

