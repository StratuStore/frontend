import { router } from "@/config/router"
import AppToaster from "@/ui/shared/AppToaster"
import { RouterProvider } from "react-router"
import { GoogleOAuthProvider } from "@react-oauth/google"

function App() {
    return (
        <>
            <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
            >
                <RouterProvider router={router} />
            </GoogleOAuthProvider>
            <AppToaster />
        </>
    )
}

export default App

