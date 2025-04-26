import { makeAutoObservable } from "mobx"
import { Folder } from ".."
import { File } from "@/entities/File"

const sampleFolders: Folder[] = [
    new Folder(
        ["documents", "2025"],
        [new File(1, "report.docx", "2025-02-22T08:00:00Z", 512000)],
        "2025-02-22T08:00:00Z"
    ),
    new Folder(
        ["images", "vacation"],
        [
            new File(4, "photo1.png", "2025-02-21T14:30:00Z", 3145728),
            new File(5, "photo2.png", "2025-02-21T14:31:00Z", 4194304),
        ],
        "2025-02-21T14:30:00Z"
    ),
]

class FolderStore {
    constructor() {
        makeAutoObservable(this)
    }

    folders: Folder[] = sampleFolders
}

export const folderStore = new FolderStore()

