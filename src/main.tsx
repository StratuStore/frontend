import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App.tsx"

import "@/assets/sass/common/base.scss"
import "swiper/swiper-bundle.css"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
)

