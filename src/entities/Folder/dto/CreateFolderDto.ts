export class CreateFolderDto {
    name: string
    parentId: string

    constructor(name: string, parentId: string) {
        this.name = name
        this.parentId = parentId
    }
}
