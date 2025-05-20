import { axios } from "@/config/axios"
import { LoginDto } from "@/entities/Auth/dto/LoginDto"
import { authMapper } from "@/entities/Auth/api/mapper"
import { LoginResponseDto } from "@/entities/Auth/dto/LoginResponseDto"
import { RefreshDto } from "@/entities/Auth/dto/RefreshDto"
import { RevokeDto } from "@/entities/Auth/dto/RevokeDto"

class AuthService {
    async login(dto: LoginDto) {
        const response = await axios.post<LoginResponseDto>("/firebase", dto)

        const instance = authMapper.mapLoginResponse(response.data)
        return instance
    }

    async refresh(dto: RefreshDto) {
        const response = await axios.post("/refresh", dto)

        const instance = authMapper.mapRefreshResponse(response.data)
        return instance
    }

    async logout(dto: RevokeDto) {
        await axios.delete("/revoke", { data: dto })
    }
}

const authService = new AuthService()
export { authService }

