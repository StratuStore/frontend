import { authService } from "@/entities/Auth/api"
import axios, { AxiosError } from "axios"
import { signInWithPopup } from "firebase/auth"
import { auth, authProvider } from "@/config/firebase"
import { autorun, makeAutoObservable, reaction, runInAction } from "mobx"
import toast from "react-hot-toast"
import { LoginDto } from "@/entities/Auth/dto/LoginDto"
import { User } from "@/entities/Auth"
import { LS_KEYS } from "@/shared/constants/ls"
import { RefreshDto } from "@/entities/Auth/dto/RefreshDto"
import { authMapper } from "@/entities/Auth/api/mapper"
import { RevokeDto } from "@/entities/Auth/dto/RevokeDto"
import { fmsClient } from "@/config/axios"
import i18next from "i18next"

export const t = i18next.t.bind(i18next)

export class AuthStore {
    constructor() {
        makeAutoObservable(this)
    }

    user: User | null = null
    accessToken: string | null = null
    isLoading = false
    isReady = false

    async login() {
        try {
            this.isLoading = true

            const googleToken = await this.getGoogleToken()

            const dto = new LoginDto(googleToken)
            const response = await authService.login(dto)

            const refreshToken = response.body.refreshToken
            const accessToken = response.body.accessToken

            this.persistAuth(refreshToken)

            const user = authMapper.getUserFromResponse(response)

            runInAction(() => {
                this.user = user
                this.accessToken = accessToken
            })
        } catch (error) {
            console.log(error)

            toast.error(t("toast.auth.signInError", { ns: "common" }))
        } finally {
            this.isLoading = false
        }
    }

    async logout() {
        this.isLoading = true

        try {
            const persistedRefreshToken = this.getPersistedRefreshToken()

            if (!persistedRefreshToken) {
                return
            }

            const dto = new RevokeDto(persistedRefreshToken)
            await authService.logout(dto)
        } catch (error) {
            console.error(error)
        } finally {
            this.isLoading = false

            this.wipeAuth()

            runInAction(() => {
                this.user = null
                this.accessToken = null
            })
        }
    }

    async hydrateAuth() {
        try {
            this.isLoading = true
            const persistedRefreshToken = this.getPersistedRefreshToken()

            if (!persistedRefreshToken) {
                return
            }

            const dto = new RefreshDto(persistedRefreshToken)
            const response = await authService.refresh(dto)

            const refreshToken = response.body.refreshToken
            this.persistAuth(refreshToken)

            const accessToken = response.body.accessToken
            const user = authMapper.getUserFromResponse(response)

            runInAction(() => {
                this.accessToken = accessToken
                this.user = user
            })
        } catch (error) {
            console.error(error)

            const statusCode = (error as AxiosError).response?.status

            if (statusCode !== 401) {
                toast.error(t("toast.auth.loadProfileError", { ns: "common" }))
            }
        } finally {
            runInAction(() => {
                this.isLoading = false
                this.isReady = true
            })
        }
    }

    async mockAuthState(accessToken: string) {
        const user = authMapper.getUserFromAccessToken(accessToken)
        this.user = user
        this.isReady = true
        this.isLoading = false
    }

    private async getGoogleToken(): Promise<string> {
        const loginResult = await signInWithPopup(auth, authProvider)
        const googleToken = await loginResult.user.getIdToken()

        if (!googleToken) {
            throw new Error("No credential found")
        }

        return googleToken
    }

    private persistAuth(refreshToken: string) {
        localStorage.setItem(LS_KEYS.RefreshToken, refreshToken)
    }

    private wipeAuth() {
        localStorage.removeItem(LS_KEYS.RefreshToken)
    }

    private getPersistedRefreshToken(): string | null {
        return localStorage.getItem(LS_KEYS.RefreshToken)
    }
}

export const authStore = new AuthStore()

autorun(() => {
    if (!authStore.isReady) {
        authStore.hydrateAuth()
    }
})

reaction(
    () => authStore.accessToken,
    (accessToken) => {
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        fmsClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    }
)

