import { z } from "zod"

export const renameFolderFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Folder name is required")
        .refine(
            (value) => value !== value,
            "New name must be different from current name"
        ),
})

export type RenameFolderFormValues = z.infer<typeof renameFolderFormSchema>

export function getDefaultValues(folderName: string): RenameFolderFormValues {
    return {
        name: folderName,
    }
}

