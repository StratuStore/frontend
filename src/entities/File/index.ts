export class File {
    constructor(id: string, name: string, createdAt: string, size: number) {
        this.id = id
        this.name = name
        this.createdAt = createdAt
        this.size = size
    }

    id: string
    name: string
    createdAt: string
    size: number

    get extension() {
        return this.name.split(".").pop() || ""
    }

    getType() {
        return File
    }
}

