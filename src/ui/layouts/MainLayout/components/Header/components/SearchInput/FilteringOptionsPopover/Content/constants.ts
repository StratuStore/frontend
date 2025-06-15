import { folderStore } from "@/entities/Folder/store"
import { AccessLevel } from "@/ui/shared/AccessLevelSelect/constants"
import { z } from "zod"

export const filteringFormSchema = z.object({
    name: z.string().trim().optional(),

    extension: z.array(z.string().trim()).optional().default([]),

    createdAtRange: z
        .object({
            from: z.date().optional(),
            to: z.date().optional(),
        })
        .optional(),

    updatedAtRange: z
        .object({
            from: z.date().optional(),
            to: z.date().optional(),
        })
        .optional(),

    accessLevel: z.union([z.nativeEnum(AccessLevel), z.literal("")]),
    isPinned: z.boolean().optional().default(false),
})

export type FilteringFormValues = z.infer<typeof filteringFormSchema>

export const defaultValues: FilteringFormValues = {
    name: undefined,
    extension: [],
    createdAtRange: undefined,
    updatedAtRange: undefined,
    accessLevel: "",
    isPinned: false,
}

export const getDefaultValues = (): FilteringFormValues => {
    const name = folderStore.search.name || defaultValues.name
    const extension = folderStore.search.extensions || defaultValues.extension

    let createdAtRange = defaultValues.createdAtRange

    if (folderStore.search.createdAtFrom || folderStore.search.createdAtTo) {
        createdAtRange = {
            from: folderStore.search.createdAtFrom || undefined,
            to: folderStore.search.createdAtTo || undefined,
        }
    }

    let updatedAtRange = defaultValues.updatedAtRange

    if (folderStore.search.updatedAtFrom || folderStore.search.updatedAtTo) {
        updatedAtRange = {
            from: folderStore.search.createdAtFrom || undefined,
            to: folderStore.search.createdAtTo || undefined,
        }
    }

    let accessLevel: AccessLevel | "" = defaultValues.accessLevel

    if (folderStore.search.public === true) {
        accessLevel = AccessLevel.Public
    } else if (folderStore.search.public === false) {
        accessLevel = AccessLevel.Private
    }

    const isPinned = folderStore.search.starred || defaultValues.isPinned

    return {
        name,
        extension,
        createdAtRange,
        updatedAtRange,
        accessLevel,
        isPinned,
    }
}

