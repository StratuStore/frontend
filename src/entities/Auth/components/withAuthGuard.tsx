import { authStore } from "@/entities/Auth/store"
import FullSreenLoader from "@/ui/shared/FullScreenLoader"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router"
import { FC, useEffect } from "react"

export function withAuthGuard(WrappedComponent: FC) {
    const ComponentWithAuth = () => {
        const navigate = useNavigate()

        useEffect(() => {
            if (authStore.isReady && !authStore.user) {
                navigate("/sso")
                return
            }
        }, [navigate])

        if (authStore.isLoading) {
            return <FullSreenLoader />
        }

        if (authStore.isReady && !authStore.user) {
            return null
        }

        return <WrappedComponent />
    }

    return observer(ComponentWithAuth)
}

