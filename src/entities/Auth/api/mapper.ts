import { LoginResponseDto } from "@/entities/Auth/dto/LoginResponseDto"
import { plainToClass } from "class-transformer"
import { jwtDecode } from "jwt-decode"
import { User } from "@/entities/Auth"
import { RefreshResponseDto } from "@/entities/Auth/dto/RefreshrResponseDto"

class AuthMapper {
    mapLoginResponse(response: LoginResponseDto): LoginResponseDto {
        return plainToClass(LoginResponseDto, response)
    }

    mapRefreshResponse(response: RefreshResponseDto): RefreshResponseDto {
        return plainToClass(RefreshResponseDto, response)
    }

    getUserFromResponse(response: LoginResponseDto): User {
        if (!response.ok) {
            throw new Error(response.message)
        }

        const accessToken = response.body.accessToken
        const payload = jwtDecode<User>(accessToken)
        const user = plainToClass(User, payload)

        return user
    }

    getUserFromAccessToken(accessToken: string): User {
        const payload = jwtDecode<User>(accessToken)
        const user = plainToClass(User, payload)

        return user
    }
}

export const authMapper = new AuthMapper()

