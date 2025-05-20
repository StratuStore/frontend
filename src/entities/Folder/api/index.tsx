import { Folder } from "@/entities/Folder"
import { File } from "@/entities/File"
import { wait } from "@/utils/id/wait"
import { CreateFolderDto } from "@/entities/Folder/dto/CreateFolderDto"
import { RenameFolderDto } from "@/entities/Folder/dto/RenameFolderDto"
import { DeleteFolderDto } from "@/entities/Folder/dto/DeleteFolderDto"
import { CopyFolderDto } from "@/entities/Folder/dto/CopyFolderDto"
import { MoveFolderDto } from "@/entities/Folder/dto/MoveFolderDto"

const mockFolders: Folder[] = [
    new Folder(
        "root-folder",
        ["root"],
        [
            new File("file-1", "readme.txt", "2025-01-01T10:00:00Z", 1024),
            new File("file-2", "config.json", "2025-01-02T14:30:00Z", 2048),
        ],
        [
            // Subfolders of root
            new Folder(
                "folder-2",
                ["root", "documents"],
                [
                    new File(
                        "file-3",
                        "report.pdf",
                        "2025-01-10T11:20:00Z",
                        5120
                    ),
                    new File(
                        "file-4",
                        "presentation.pptx",
                        "2025-01-15T16:45:00Z",
                        4096
                    ),
                ],
                [], // No subfolders
                "2025-01-05T13:15:00Z"
            ),
            new Folder(
                "folder-3",
                ["root", "images"],
                [
                    new File(
                        "file-5",
                        "photo1.jpg",
                        "2025-02-01T09:30:00Z",
                        3072
                    ),
                    new File(
                        "file-6",
                        "photo2.jpg",
                        "2025-02-01T09:35:00Z",
                        2560
                    ),
                    new File(
                        "file-7",
                        "logo.png",
                        "2025-02-05T14:20:00Z",
                        1536
                    ),
                ],
                [], // No subfolders
                "2025-01-20T10:10:00Z"
            ),
            new Folder(
                "folder-4",
                ["root", "projects"],
                [
                    new File(
                        "file-8",
                        "project1.zip",
                        "2025-02-10T15:40:00Z",
                        10240
                    ),
                ],
                [
                    // Subfolder of projects
                    new Folder(
                        "folder-5",
                        ["root", "projects", "src"],
                        [
                            new File(
                                "file-9",
                                "main.ts",
                                "2025-02-12T11:25:00Z",
                                512
                            ),
                            new File(
                                "file-10",
                                "utils.ts",
                                "2025-02-12T13:45:00Z",
                                768
                            ),
                        ],
                        [], // No subfolders
                        "2025-02-12T11:20:00Z"
                    ),
                ],
                "2025-02-10T15:30:00Z"
            ),
        ],
        "2025-01-01T09:00:00Z"
    ),
]

class FolderSerive {
    async getById(id: string): Promise<Folder | null> {
        const searchFolder = (folders: Folder[]): Folder | null => {
            for (const folder of folders) {
                if (folder.id === id) {
                    return folder
                }

                const found = searchFolder(folder.folders)

                if (found) {
                    return found
                }
            }

            return null
        }

        const folder = searchFolder(mockFolders)

        await wait(2000)
        return folder
    }

    async getByPath(path: string[]): Promise<Folder | null> {
        const searchFolder = (folders: Folder[]): Folder | null => {
            for (const folder of folders) {
                if (folder.path.join("/") === path.join("/")) {
                    return folder
                }

                const found = searchFolder(folder.folders)

                if (found) {
                    return found
                }
            }

            return null
        }

        const folder = searchFolder(mockFolders)

        await wait(2000)
        return folder
    }

    getRootFolder() {
        return mockFolders.find((folder) => folder.path.length === 1)
    }

    getFolderContents(id: string, offset = 0, limit = 10) {
        console.log(id, offset, limit)

        // return new Promise<void>((resolve) => {
        //     setTimeout(() => {
        //         resolve()
        //     }, 2000)
        // })

        return
    }

    async create(dto: CreateFolderDto): Promise<void> {
        console.log(dto)
        await wait(2000)
    }

    async rename(dto: RenameFolderDto): Promise<void> {
        console.log(dto)
        await wait(2000)
    }

    async delete(dto: DeleteFolderDto): Promise<void> {
        console.log(dto)
        await wait(2000)
    }

    async copy(dto: CopyFolderDto): Promise<void> {
        console.log(dto)
        await wait(2000)
    }

    async move(dto: MoveFolderDto): Promise<void> {
        console.log(dto)
        await wait(2000)
    }
}

export const folderService = new FolderSerive()

