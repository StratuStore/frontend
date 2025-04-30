import { File } from "@/entities/File"

export class Folder {
    id: string
    path: string[]
    files: File[]
    folders: Folder[]
    createdAt: string

    constructor(
        id: string,
        path: string[],
        files: File[],
        folders: Folder[],
        createdAt: string
    ) {
        this.id = id
        this.path = path
        this.files = files
        this.folders = folders
        this.createdAt = createdAt
    }

    getType() {
        return Folder
    }
}

