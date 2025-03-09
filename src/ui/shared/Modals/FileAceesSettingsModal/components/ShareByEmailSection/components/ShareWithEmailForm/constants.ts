import { z } from "zod"

export const shareWithEmailSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
})

export type ShareWithEmailFormData = z.infer<typeof shareWithEmailSchema>

