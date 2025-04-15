import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import "./config/i18n"

import App from "./App.tsx"

import "@/assets/sass/common/base.scss"
import "swiper/swiper-bundle.css"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense fallback="Loading...">
            <App />
        </Suspense>
    </StrictMode>
)

