import { Folder } from "@/entities/Folder"
import { File } from "@/entities/File"
import { fmsClient } from "@/config/axios"
import { plainToClass } from "class-transformer"
import { SearchDto } from "@/entities/Search/dto/SearchDto"
import { SearchResponseDto } from "@/entities/Search/dto/SearchResponseDto"
import { FOLDER_CONTENTS_TABLE_PAGE_SIZE } from "@/entities/Folder/constants"

class SearchService {
    async getResults(dto: SearchDto) {
        const { extensions, limit, offset, ...rest } = dto

        const response = await fmsClient.get<SearchResponseDto>(
            `/directory/search`,
            {
                params: {
                    ...rest,
                    limit: limit ?? FOLDER_CONTENTS_TABLE_PAGE_SIZE,
                    offset: offset ?? 0,
                    extensions: extensions?.join(","),
                },
            }
        )

        const folders =
            response.data.body?.directories?.map((folder) =>
                plainToClass(Folder, folder, {
                    enableCircularCheck: true,
                })
            ) ?? []

        const files = response.data.body.files.map((file) =>
            plainToClass(File, file, {
                enableCircularCheck: true,
            })
        )

        return {
            folders: folders,
            files: files,
            foldersCount: response.data.body.directoriesCount,
            filesCount: response.data.body.filesCount,
        }
    }
}

export const searchService = new SearchService()

