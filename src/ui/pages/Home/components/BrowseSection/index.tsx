import Breadcrumbs from "@/ui/shared/Breadcrumbs"
import styles from "./styles.module.scss"
import { Folder } from "@/types/models/Folder"
import { File } from "@/types/models/File"
import FolderContentsTable from "@/ui/pages/Home/components/BrowseSection/components/FolderContentsTable"

const sampleFiles: File[] = [
    {
        id: 1,
        name: "document.pdf",
        createdAt: "2025-02-22T10:30:00Z",
        size: 1024576,
    },
    {
        id: 2,
        name: "image.jpg",
        createdAt: "2025-02-21T15:45:00Z",
        size: 2097152,
    },
    {
        id: 3,
        name: "script.js",
        createdAt: "2025-02-20T09:15:00Z",
        size: 5120,
    },
    {
        id: 4,
        name: "presentation.pptx",
        createdAt: "2025-02-19T11:00:00Z",
        size: 5242880,
    },
    {
        id: 5,
        name: "spreadsheet.xlsx",
        createdAt: "2025-02-18T08:45:00Z",
        size: 1048576,
    },
    {
        id: 6,
        name: "archive.zip",
        createdAt: "2025-02-17T13:30:00Z",
        size: 10485760,
    },
]

const sampleFolders: Folder[] = [
    {
        path: ["documents", "2025"],
        files: [
            {
                id: 1,
                name: "report.docx",
                createdAt: "2025-02-22T08:00:00Z",
                size: 512000,
            },
        ],
        createdAt: "2025-02-22T08:00:00Z",
    },
    {
        path: ["images", "vacation"],
        files: [
            {
                id: 4,
                name: "photo1.png",
                createdAt: "2025-02-21T14:30:00Z",
                size: 3145728,
            },
            {
                id: 5,
                name: "photo2.png",
                createdAt: "2025-02-21T14:31:00Z",
                size: 4194304,
            },
        ],
        createdAt: "2025-02-21T14:30:00Z",
    },
]

export default function BrowseSection() {
    return (
        <>
            <div className={styles.headerWrapper}>
                <h2 className={styles.header}>Browse</h2>
            </div>
            <div className={styles.breadcrumbsWrapper}>
                <Breadcrumbs items={["Home", "Browse"]} />
            </div>
            <div className={styles.contentsTableWrapper}>
                <FolderContentsTable
                    files={sampleFiles}
                    folders={sampleFolders}
                />
            </div>
        </>
    )
}

