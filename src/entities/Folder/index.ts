import { File } from "@/entities/File"
import { PathFragment } from "@/entities/Folder/types/PathFramgent"
import { Expose, plainToInstance, Transform } from "class-transformer"

export class Folder {
    id: string

    @Transform(({ obj }) => {
        const path = obj.path ?? []
        return path
    })
    path: PathFragment[]

    @Transform(({ obj }) => {
        const files = obj.files ?? []
        return files.map((file: object) => plainToInstance(File, file))
    })
    files: File[]

    @Expose({ name: "directories" })
    @Transform(({ obj }) => {
        const folders = obj.directories ?? []
        return folders.map((folder: object) => plainToInstance(Folder, folder))
    })
    folders: Folder[]

    @Expose({ name: "public" })
    shared: boolean

    filesCount: number
    foldersCount: number
    createdAt: string
    updatedAt: string
    size: number
    name: string

    constructor(
        id: string,
        path: PathFragment[],
        files: File[],
        folders: Folder[],
        createdAt: string,
        updatedAt: string,
        shared: boolean,
        size: number,
        filesCount: number,
        foldersCount: number,
        name: string
    ) {
        this.id = id
        this.path = path
        this.files = files
        this.folders = folders
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.shared = shared
        this.size = size
        this.filesCount = filesCount
        this.foldersCount = foldersCount
        this.name = name
    }
}

