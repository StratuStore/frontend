import { ApiResponse } from "@/shared/api/types/ApiResponse"

type RefreshResponseBody = {
    accessToken: string
    refreshToken: string
}

export class RefreshResponseDto extends ApiResponse<RefreshResponseBody> {
    constructor(
        public readonly ok: boolean,
        public readonly body: RefreshResponseBody,
        public readonly message?: string
    ) {
        super(ok, body, message)
    }
}

