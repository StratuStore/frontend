export class File {
    id: string
    name: string
    createdAt: string
    size: number

    constructor(id: string, name: string, createdAt: string, size: number) {
        this.id = id
        this.name = name
        this.createdAt = createdAt
        this.size = size
    }

    getType() {
        return File
    }
}

