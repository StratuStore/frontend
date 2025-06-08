import { Expose } from "class-transformer"
import { makeAutoObservable } from "mobx"

export class File {
    constructor(
        id: string,
        name: string,
        createdAt: string,
        size: number,
        updatedAt: string,
        starred: boolean,
        shared: boolean,
        extension: string,
        host: string,
        connectionId: string
    ) {
        this.id = id
        this.name = name
        this.createdAt = createdAt
        this.size = size
        this.updatedAt = updatedAt
        this.starred = starred
        this.shared = shared
        this.extension = extension
        this.host = host
        this.connectionId = connectionId

        makeAutoObservable(this)
    }

    id: string
    name: string
    createdAt: string
    updatedAt: string
    size: number
    starred: boolean
    extension: string
    host?: string

    @Expose({ name: "connectionID" })
    connectionId?: string

    @Expose({ name: "public" })
    shared: boolean

    getUrl(): string {
        return `${this.host}/files/read?connectionID=${this.connectionId}&name=${this.name}`
    }
}

