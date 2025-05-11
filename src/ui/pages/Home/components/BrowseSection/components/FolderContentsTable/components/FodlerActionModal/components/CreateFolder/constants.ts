import { z } from "zod"

export const createFolderFormSchema = z.object({
    name: z.string().trim().min(1, "Folder name is required"),
})

export type CreateFolderFormValues = z.infer<typeof createFolderFormSchema>

export const defaultValues: CreateFolderFormValues = {
    name: "",
}

