import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"

import App from "./App.tsx"

import "swiper/swiper-bundle.css"

import "@/assets/sass/common/base.scss"
import "@/config/firebase"
import "@/config/i18n"
import "reflect-metadata/Reflect"
import FullSreenLoader from "@/ui/shared/FullScreenLoader/index.tsx"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense fallback={<FullSreenLoader />}>
            <App />
        </Suspense>
    </StrictMode>
)

