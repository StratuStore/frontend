import { Folder } from "@/entities/Folder"
import { wait } from "@/utils/id/wait"
import { CreateFolderDto } from "@/entities/Folder/dto/CreateFolderDto"
import { RenameFolderDto } from "@/entities/Folder/dto/RenameFolderDto"
import { DeleteFolderDto } from "@/entities/Folder/dto/DeleteFolderDto"
import { CopyFolderDto } from "@/entities/Folder/dto/CopyFolderDto"
import { MoveFolderDto } from "@/entities/Folder/dto/MoveFolderDto"
import { GetFolderDto } from "@/entities/Folder/dto/GetFolderDto"
import { fmsClient } from "@/config/axios"
import { plainToClass } from "class-transformer"
import { GetFolderResponseDto } from "@/entities/Folder/dto/GetFolderResponseDto"
import { FolderContents } from "@/entities/Folder/types/FolderContents"
class FolderSerive {
    async getById(id: string): Promise<Folder> {
        const params = {
            offset: 0,
            limit: 50,
        }

        const response = await fmsClient.get<GetFolderResponseDto>(
            `/directory/${id}`,
            {
                params,
            }
        )
        const instance = plainToClass(Folder, response.data.body, {
            enableCircularCheck: true,
        })

        return instance
    }

    async getRootFolder() {
        const params = {
            offset: 0,
            limit: 50,
        }

        const response = await fmsClient.get<GetFolderResponseDto>(
            `/directory/`,
            {
                params,
            }
        )
        const instance = plainToClass(Folder, response.data.body, {
            enableCircularCheck: true,
        })

        return instance
    }

    async getFolderContents(dto: GetFolderDto): Promise<FolderContents> {
        const response = await fmsClient.get<GetFolderResponseDto>(
            `/directory/${dto.id}`,
            {
                params: dto.toQueryParams(),
            }
        )
        const instance = plainToClass(Folder, response.data.body)

        return {
            files: instance.files,
            folders: instance.folders,
            foldersCount: instance.foldersCount,
            filesCount: instance.filesCount,
        }
    }

    async create(dto: CreateFolderDto): Promise<void> {
        await fmsClient.post("/directory", dto)
    }

    async rename(dto: RenameFolderDto): Promise<void> {
        await fmsClient.patch(`/directory/${dto.id}/rename`, undefined, {
            params: {
                name: dto.name,
            },
        })
    }

    async delete(dto: DeleteFolderDto): Promise<void> {
        await fmsClient.delete(`/directory/${dto.id}`)
    }

    async copy(dto: CopyFolderDto): Promise<void> {
        console.log(dto)
        await wait(2000)
    }

    async move(dto: MoveFolderDto): Promise<void> {
        await fmsClient.patch(`/directory/${dto.id}/move`, undefined, {
            params: {
                to: dto.to,
            },
        })
    }
}

export const folderService = new FolderSerive()

