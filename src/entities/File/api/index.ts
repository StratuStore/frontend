import { RenameFileDto } from "@/entities/File/dto/RenameFileDto"
import { CreateFileDto } from "@/entities/File/dto/CreateFileDto"
import { fmsClient, fsClient } from "@/config/axios"
import { MoveFileDto } from "@/entities/File/dto/MoveFileDto"
import { File } from "@/entities/File"
import { CreateFileResponseDto } from "@/entities/File/dto/CreateFileResponseDto"
import { plainToClass } from "class-transformer"
import { GetFileResponseDto } from "@/entities/File/dto/GetFileDto"

class FileService {
    async create(dto: CreateFileDto): Promise<File> {
        const response = await fmsClient.post<CreateFileResponseDto>(
            "/file",
            dto
        )
        const instance = plainToClass(File, response.data.body)
        return instance
    }

    async rename(dto: RenameFileDto): Promise<void> {
        await fmsClient.patch(`/file/${dto.id}/rename`, undefined, {
            params: {
                name: dto.name,
            },
        })
    }

    async delete(id: string): Promise<void> {
        await fmsClient.delete(`/file/${id}`)
    }

    async move(dto: MoveFileDto): Promise<void> {
        await fmsClient.patch(`/file/${dto.id}/move`, undefined, {
            params: {
                to: dto.to,
            },
        })
    }

    async openConnection(fileId: string) {
        const response = await fmsClient.get<GetFileResponseDto>(
            `/file/${fileId}`
        )

        const instance = plainToClass(File, response.data.body)
        return {
            connectionId: instance.connectionId,
            host: instance.host,
        }
    }

    async closeConnection(file: File) {
        await fsClient.post(
            `${file.host}/files/close?connectionID=${file.connectionId}`
        )
    }
}

export const fileService = new FileService()

