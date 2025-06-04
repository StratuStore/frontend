export class SearchDto {
    constructor(init?: Partial<SearchDto>) {
        Object.assign(this, init)
    }

    name?: string = undefined
    createdAtFrom?: Date = undefined
    createdAtTo?: Date = undefined
    updatedAtFrom?: Date = undefined
    updatedAtTo?: Date = undefined
    public?: boolean = undefined
    size?: number = undefined
    starred?: boolean = undefined
    extensions?: string[] = undefined
    offset?: number = undefined
    limit?: number = undefined
    sortByField?: string = undefined
    sortOrder?: number = undefined
}

