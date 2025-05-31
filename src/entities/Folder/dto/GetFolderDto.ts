import { SortingDirection } from "@/entities/Folder/types/SortingDirection"

export class GetFolderDto {
    constructor(
        public readonly id: string | undefined,
        public readonly offset?: number,
        public readonly limit?: number,
        public readonly sortByField?: string,
        public readonly sortDirection?: SortingDirection
    ) {}

    toQueryParams() {
        return {
            offset: this.offset,
            limit: this.limit,
            sortByField: this.sortByField,
            sortDirection: this.sortDirection,
        }
    }
}

