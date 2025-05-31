import { z } from "zod"

export const createRenameFolderFormSchema = (originalName: string) =>
    z.object({
        name: z
            .string()
            .trim()
            .min(1, "Folder name is required")
            .refine(
                (value) => value !== originalName,
                "New name must be different from current name"
            ),
    })

export type RenameFolderFormValues = z.infer<
    ReturnType<typeof createRenameFolderFormSchema>
>

export function getDefaultValues(folderName: string): RenameFolderFormValues {
    return {
        name: folderName,
    }
}

