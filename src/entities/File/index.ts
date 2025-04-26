export class File {
    id: number
    name: string
    createdAt: string
    size: number

    constructor(id: number, name: string, createdAt: string, size: number) {
        this.id = id
        this.name = name
        this.createdAt = createdAt
        this.size = size
    }

    getType() {
        return File
    }
}

