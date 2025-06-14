import { authStore } from "@/entities/Auth/store"
import Button from "@/ui/shared/Button"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router"

function GoogleLoginButtonComponent() {
    const { redirectTo } = useParams()
    const navigate = useNavigate()
    const { t } = useTranslation("auth")

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
            {t("loginButton")}
        </Button>
    )
}

const GoogleLoginButton = observer(GoogleLoginButtonComponent)
export default GoogleLoginButton

