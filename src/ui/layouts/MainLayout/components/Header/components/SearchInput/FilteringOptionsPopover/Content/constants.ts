import { z } from "zod"

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const FILE_EXTENSION_REGEX = /^\.[a-zA-Z0-9]+$/

export const filteringFormSchema = z.object({
    name: z.string().trim().optional(),
    extension: z
        .array(z.string().trim())
        .optional()
        .default([])
        .superRefine((values, ctx) => {
            const invalidIndex = values.findIndex(
                (val) => !FILE_EXTENSION_REGEX.test(val)
            )
            if (invalidIndex !== -1) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        "File extensions must start with a period (e.g. '.pdf')",
                    path: [invalidIndex],
                })
                return z.NEVER
            }
        }),
    sharedWith: z
        .array(z.string().trim())
        .optional()
        .default([])
        .superRefine((values, ctx) => {
            const invalidIndex = values.findIndex(
                (val) => !EMAIL_REGEX.test(val)
            )
            if (invalidIndex !== -1) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "All items must be valid email addresses",
                    path: [invalidIndex],
                })
                return z.NEVER
            }
        }),
    isPinned: z.boolean().optional().default(false),
})

export type FilteringFormValues = z.infer<typeof filteringFormSchema>

export const defaultValues: FilteringFormValues = {
    name: "",
    extension: [],
    sharedWith: [],
    isPinned: false,
}

