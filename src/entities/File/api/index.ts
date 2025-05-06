import { RenameFileDto } from "@/entities/File/dto/RenameFileDto"
import { wait } from "@/utils/id/wait"

class FileService {
    async renameFile(dto: RenameFileDto): Promise<void> {
        console.log(dto)
        await wait(2000)
    }

    async deleteFile(id: string): Promise<void> {
        console.log(id)
        await wait(2000)
    }
}

export const fileService = new FileService()

