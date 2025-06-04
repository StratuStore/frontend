import { AccessLevel } from "@/ui/shared/AccessLevelSelect/constants"
import { z } from "zod"

// const FILE_EXTENSION_REGEX = /^\.[a-zA-Z0-9]+$/

export const filteringFormSchema = z.object({
    name: z.string().trim().optional(),

    extension: z.array(z.string().trim()).optional().default([]),
    // .superRefine((values, ctx) => {
    //     const invalidIndex = values.findIndex(
    //         (val) => !FILE_EXTENSION_REGEX.test(val)
    //     )
    //     if (invalidIndex !== -1) {
    //         ctx.addIssue({
    //             code: z.ZodIssueCode.custom,
    //             message:
    //                 "File extensions must start with a period (e.g. '.pdf')",
    //             path: [invalidIndex],
    //         })
    //         return z.NEVER
    //     }
    // }),

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

