import { makeAutoObservable } from "mobx"
import { File } from ".."

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

class FileStore {
    constructor() {
        makeAutoObservable(this)
    }

    files: File[] = sampleFiles
    activeFile: File | null = null

    selectFile(file: File) {
        this.activeFile = file
    }

    deselectFile() {
        this.activeFile = null
    }
}

export const fileStore = new FileStore()

