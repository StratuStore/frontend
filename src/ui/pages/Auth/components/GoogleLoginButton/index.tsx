import { authStore } from "@/entities/Auth/store"
import Button from "@/ui/shared/Button"
import { observer } from "mobx-react-lite"
import { useNavigate, useParams } from "react-router"

function GoogleLoginButtonComponent() {
    const { redirectTo } = useParams()
    const navigate = useNavigate()

    async function handleLoginClick() {
        await authStore.login()

        if (authStore.isReady && authStore.user) {
            navigate(redirectTo || "/")
        }
    }

    return (
        <Button
            onClick={handleLoginClick}
            loading={authStore.isLoading}
            data-testid="google-login-button"
        >
            Login with Google
        </Button>
    )
}

const GoogleLoginButton = observer(GoogleLoginButtonComponent)
export default GoogleLoginButton

