import { ApiResponse } from "@/shared/api/types/ApiResponse"
import { File } from "@/entities/File"

export class CreateFileResponseDto extends ApiResponse<File> {
    constructor(
        public readonly ok: boolean,
        public readonly body: File,
        public readonly message?: string
    ) {
        super(ok, body, message)
    }
}

