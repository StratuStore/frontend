import MainLayout from "@/ui/layouts/MainLayout"
import HomePage from "@/ui/pages/Home"
import AppToaster from "@/ui/shared/AppToaster"

function App() {
    return (
        <>
            <MainLayout>
                <HomePage />
            </MainLayout>
            <AppToaster />
        </>
    )
}

export default App

