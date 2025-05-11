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
}

export const fileService = new FileService()

