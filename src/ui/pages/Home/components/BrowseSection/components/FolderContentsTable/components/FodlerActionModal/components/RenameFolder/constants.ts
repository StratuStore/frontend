import { z } from "zod"

import i18next from "i18next"
export const t = i18next.t.bind(i18next)

export const createRenameFolderFormSchema = (originalName: string) =>
    z.object({
        name: z
            .string()
            .trim()
            .min(1, t("renameFolderModal.validation.required", { ns: "home" }))
            .refine(
                (value) => value !== originalName,
                t("renameFolderModal.validation.differentName", { ns: "home" })
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

