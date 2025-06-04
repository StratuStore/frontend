import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"

import App from "./App.tsx"
import FullSreenLoader from "@/ui/shared/FullScreenLoader/index.tsx"

import "reflect-metadata/Reflect"

import "swiper/swiper-bundle.css"
import "@/config/firebase"
import "@/config/i18n"
import "rc-picker/assets/index.css"
import "@/assets/css/global.css"
import "@/assets/sass/common/base.scss"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense fallback={<FullSreenLoader />}>
            <App />
        </Suspense>
    </StrictMode>
)

