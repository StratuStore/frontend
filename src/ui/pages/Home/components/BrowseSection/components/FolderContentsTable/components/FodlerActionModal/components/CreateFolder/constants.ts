import { z } from "zod"

import i18next from "i18next"
export const t = i18next.t.bind(i18next)

export const createFolderFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, t("createFolderModal.validation.required", { ns: "home" })),
})

export type CreateFolderFormValues = z.infer<typeof createFolderFormSchema>

export const defaultValues: CreateFolderFormValues = {
    name: "",
}

