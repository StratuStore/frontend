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

    accessLevel: z.union([z.nativeEnum(AccessLevel), z.literal("")]).optional(),
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

