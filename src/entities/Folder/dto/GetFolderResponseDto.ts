import { Folder } from "@/entities/Folder"
import { ApiResponse } from "@/shared/api/types/ApiResponse"

type GetFolderResponseBody = Folder

export class GetFolderResponseDto extends ApiResponse<GetFolderResponseBody> {
    constructor(
        public readonly ok: boolean,
        public readonly body: GetFolderResponseBody,
        public readonly message?: string
    ) {
        super(ok, body, message)
    }
}

