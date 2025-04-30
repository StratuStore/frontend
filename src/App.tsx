import { router } from "@/config/router"
import AppToaster from "@/ui/shared/AppToaster"
import { RouterProvider } from "react-router"

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <AppToaster />
        </>
    )
}

export default App

