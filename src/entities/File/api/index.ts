import { RenameFileDto } from "@/entities/File/dto/RenameFileDto"
import { CopyFileDto } from "@/entities/File/dto/CopyFileDto"
import { wait } from "@/utils/id/wait"
import { MoveFileDto } from "@/entities/File/dto/MoveFileDto"

class FileService {
    async renameFile(dto: RenameFileDto): Promise<void> {
        console.log(dto)
        await wait(2000)
    }

    async deleteFile(id: string): Promise<void> {
        console.log(id)
        await wait(2000)
    }

    async copyFile(dto: CopyFileDto): Promise<void> {
        console.log(dto)
        await wait(2000)
    }

    async moveFile(dto: MoveFileDto): Promise<void> {
        console.log(dto)
        await wait(2000)
    }

    async uploadFile(folderId: string, file: File): Promise<void> {
        console.log(folderId, file)
        await wait(2000)
    }

    async openConnection(fileId: string): Promise<string> {
        console.log(fileId)
        await wait(2000)
        return "8f1a07f4-f88f-4f70-9fc2-70e66792044c"
    }

    async closeConnection(connectiondId: string): Promise<void> {
        console.log(connectiondId)
        await wait(2000)
    }

    getDownloadUrl(connectionId: string): string {
        return `${
            import.meta.env.VITE_FS_MOCK_BASE_URL
        }/files/read?connectionID=${connectionId}`
    }
}

export const fileService = new FileService()

