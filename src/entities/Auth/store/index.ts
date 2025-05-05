import { makeAutoObservable } from 'mobx'

export class AuthStore {
    constructor() {
        makeAutoObservable(this)
    }

    isAuthenticated = false
    isLoading = false
    error = null
    user = null

    setIsAuthenticated(isAuthenticated: boolean) {
        this.isAuthenticated = isAuthenticated
    }

    setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading
    }

    setError(error: any) {
        this.error = error
    }

    setUser(user: any) {
        this.user = user
    }
}