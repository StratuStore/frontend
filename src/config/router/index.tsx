import { createBrowserRouter } from "react-router"

import MainLayout from "@/ui/layouts/MainLayout"
import HomePage from "@/ui/pages/Home"
import SearchPage from "@/ui/pages/Search"
import PinnedPage from "@/ui/pages/Pinned"
import FolderPage from "@/ui/pages/Folder"

export const router = createBrowserRouter([
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
])

