import { makeAutoObservable } from "mobx"
import { Folder } from ".."

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

class FolderStore {
    constructor() {
        makeAutoObservable(this)
    }

    folders: Folder[] = sampleFolders
}

export const folderStore = new FolderStore()

