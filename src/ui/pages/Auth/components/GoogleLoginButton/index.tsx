import { authStore } from "@/entities/Auth/store"
import Button from "@/ui/shared/Button"
<<<<<<< Updated upstream
import { observer } from "mobx-react-lite"
import { useNavigate, useParams } from "react-router"
=======
import {
    CredentialResponse,
    GoogleLogin,
    useGoogleLogin,
} from "@react-oauth/google"
>>>>>>> Stashed changes

function GoogleLoginButtonComponent() {
    const { redirectTo } = useParams()
    const navigate = useNavigate()

    async function handleLoginClick() {
        await authStore.login()

        if (authStore.isReady && authStore.user) {
            navigate(redirectTo || "/")
        }
    }

    // return (
    //     <Button
    //         variant="outline"
    //         onClick={() => {
    //             login()
    //         }}
    //     >
    //         Login with Google
    //     </Button>
    // )

    return (
<<<<<<< Updated upstream
        <Button onClick={handleLoginClick} loading={authStore.isLoading}>
            Login with Google
        </Button>
=======
        <GoogleLogin
            onSuccess={(credentialResponse: CredentialResponse) =>
                console.log(credentialResponse)
            }
        />
>>>>>>> Stashed changes
    )
}

const GoogleLoginButton = observer(GoogleLoginButtonComponent)
export default GoogleLoginButton

