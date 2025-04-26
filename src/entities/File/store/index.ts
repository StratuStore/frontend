import { makeAutoObservable } from "mobx"
import { File } from ".."

const sampleFiles: File[] = [
    new File(1, "document.pdf", "2025-02-22T10:30:00Z", 1024576),
    new File(2, "image.jpg", "2025-02-21T15:45:00Z", 2097152),
    new File(3, "script.js", "2025-02-20T09:15:00Z", 5120),
    new File(4, "presentation.pptx", "2025-02-19T11:00:00Z", 5242880),
    new File(5, "spreadsheet.xlsx", "2025-02-18T08:45:00Z", 1048576),
    new File(6, "archive.zip", "2025-02-17T13:30:00Z", 10485760),
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

