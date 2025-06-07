import { createBrowserRouter } from "react-router"

import MainLayout from "@/ui/layouts/MainLayout"
import HomePage from "@/ui/pages/Home"
import SearchPage from "@/ui/pages/Search"
import PinnedPage from "@/ui/pages/Pinned"
import FolderPage from "@/ui/pages/Folder"
import NotFoundPage from "@/ui/pages/NotFound"
import AuthPage from "@/ui/pages/Auth"
import SharePage from "@/ui/pages/Share"

export const router = createBrowserRouter([
    {
        path: "/not-found",
        element: <NotFoundPage />,
    },
    {
        path: "auth",
        element: <AuthPage />,
    },
    {
        path: "share/:id",
        element: <SharePage />,
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "search",
                element: <SearchPage />,
            },
            {
                path: "pinned",
                element: <PinnedPage />,
            },
            {
                path: "folder/:id",
                element: <FolderPage />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
])

