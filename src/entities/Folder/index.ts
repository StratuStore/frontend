import { File } from "@/entities/File"

export class Folder {
    path: string[]
    files: File[]
    createdAt: string

    constructor(path: string[], files: File[], createdAt: string) {
        this.path = path
        this.files = files
        this.createdAt = createdAt
    }
}

