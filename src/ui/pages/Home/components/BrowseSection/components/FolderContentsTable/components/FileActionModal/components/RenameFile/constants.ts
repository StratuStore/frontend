import { z } from "zod"

export const createRenameFileFormSchema = (originalName: string) =>
    z.object({
        name: z
            .string()
            .trim()
            .min(1, "File name is required")
            .refine(
                (value) => value !== originalName,
                "New name must be different from current name"
            ),
    })

export type RenameFileFormValues = z.infer<
    ReturnType<typeof createRenameFileFormSchema>
>

export function getDefaultValues(fileName: string): RenameFileFormValues {
    return {
        name: fileName,
    }
}

