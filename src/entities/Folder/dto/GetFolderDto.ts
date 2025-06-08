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
        if (!this.sortByField) {
            return {
                offset: this.offset,
                limit: this.limit,
            }
        }

        return {
            offset: this.offset,
            limit: this.limit,
            sortByField: this.sortByField,
            sortOrder: this.sortDirection,
        }
    }
}

