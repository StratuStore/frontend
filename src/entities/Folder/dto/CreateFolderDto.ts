export class CreateFolderDto {
    name: string
    parentDirectoryId: string

    constructor(name: string, parentId: string) {
        this.name = name
        this.parentDirectoryId = parentId
    }
}

