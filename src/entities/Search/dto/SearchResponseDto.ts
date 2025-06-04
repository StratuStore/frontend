import { Folder } from "@/entities/Folder"
import { ApiResponse } from "@/shared/api/types/ApiResponse"

type SearchResponseBody = {
    directories?: Folder[]
    files: File[]
    directoriesCount: number
    filesCount: number
}

export class SearchResponseDto extends ApiResponse<SearchResponseBody> {
    constructor(
        public readonly ok: boolean,
        public readonly body: SearchResponseBody,
        public readonly message?: string
    ) {
        super(ok, body, message)
    }
}

