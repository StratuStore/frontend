import { ApiResponse } from "@/shared/api/types/ApiResponse"

type LoginResponseBody = {
    accessToken: string
    refreshToken: string
}

export class LoginResponseDto extends ApiResponse<LoginResponseBody> {
    constructor(
        public readonly ok: boolean,
        public readonly body: LoginResponseBody,
        public readonly message?: string
    ) {
        super(ok, body, message)
    }
}

