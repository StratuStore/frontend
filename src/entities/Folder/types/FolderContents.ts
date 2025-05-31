import { File } from "@/entities/File"
import { Folder } from "@/entities/Folder"

export type FolderContents = {
    files: File[]
    folders: Folder[]
    foldersCount: number
    filesCount: number
}

