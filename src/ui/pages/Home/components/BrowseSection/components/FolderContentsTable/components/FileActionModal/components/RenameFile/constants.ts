import { z } from "zod"

export const renameFileFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "File name is required")
        .refine(
            (value) => value !== value,
            "New name must be different from current name"
        ),
})

export type RenameFileFormValues = z.infer<typeof renameFileFormSchema>

export function getDefaultValues(fileName: string): RenameFileFormValues {
    return {
        name: fileName,
    }
}

