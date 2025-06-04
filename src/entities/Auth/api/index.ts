import { LoginDto } from "@/entities/Auth/dto/LoginDto"
import { authMapper } from "@/entities/Auth/api/mapper"
import { LoginResponseDto } from "@/entities/Auth/dto/LoginResponseDto"
import { RefreshDto } from "@/entities/Auth/dto/RefreshDto"
import { RevokeDto } from "@/entities/Auth/dto/RevokeDto"
import { authClient } from "@/config/axios"

class AuthService {
    async login(dto: LoginDto) {
        const response = await authClient.post<LoginResponseDto>(
            "/firebase",
            dto
        )

        const instance = authMapper.mapLoginResponse(response.data)
        return instance
    }

    async refresh(dto: RefreshDto) {
        const response = await authClient.post("/refresh", dto)

        const instance = authMapper.mapRefreshResponse(response.data)
        return instance
    }

    async logout(dto: RevokeDto) {
        await authClient.delete("/revoke", { data: dto })
    }
}

const authService = new AuthService()
export { authService }

