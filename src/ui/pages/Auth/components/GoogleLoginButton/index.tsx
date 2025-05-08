import Button from "@/ui/shared/Button"
import { useGoogleLogin } from "@react-oauth/google"

export default function GoogleLoginButton() {
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => console.log(tokenResponse),
    })

    return (
        <Button
            variant="outline"
            onClick={() => {
                login()
            }}
        >
            Login with Google
        </Button>
    )
}

