import { File } from "@/types/models/File"

export type Folder = {
    path: string[]
    files: File[]
    createdAt: string
}

