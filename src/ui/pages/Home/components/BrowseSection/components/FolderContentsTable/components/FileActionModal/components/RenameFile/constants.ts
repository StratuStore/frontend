import { z } from "zod"

import i18next from "i18next"
export const t = i18next.t.bind(i18next)

export const createRenameFileFormSchema = (originalName: string) =>
    z.object({
        name: z
            .string()
            .trim()
            .min(1, t("renameFileModal.validation.required", { ns: "home" }))
            .refine(
                (value) => value !== originalName,
                t("renameFileModal.validation.differentName", { ns: "home" })
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

