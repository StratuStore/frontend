import { useCallback, useRef } from "react"
import { Folder } from "@/entities/Folder"
import { fileUploadStore } from "@/entities/FileUpload/store"

export function useFileUpload() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const currentFolderRef = useRef<Folder | null>(null)

    const uploadFile = useCallback((file: File, targetFolder: Folder) => {
        console.log(`Uploading file ${file.name} to folder:`, targetFolder)

        fileUploadStore.addFileUpload(targetFolder, file)
    }, [])

    const handleFileInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files
            if (!files || files.length === 0 || !currentFolderRef.current)
                return

            Array.from(files).forEach((file) => {
                uploadFile(file, currentFolderRef.current!)
            })

            event.target.value = ""
        },
        [uploadFile]
    )

    const handleUploadClick = useCallback((folder: Folder) => {
        currentFolderRef.current = folder
        fileInputRef.current?.click()
    }, [])

    return {
        fileInputRef,
        handleFileInputChange,
        handleUploadClick,
    }
}

