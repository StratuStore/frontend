import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "@/ui/shared/Input"
import Button from "@/ui/shared/Button"
import { shareWithEmailSchema, type ShareWithEmailFormData } from "./constants"
import styles from "./styles.module.scss"
import FormControl from "@/ui/shared/forms/FormControl"
import { useRef } from "react"

export default function ShareWithEmailForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<ShareWithEmailFormData>({
        resolver: zodResolver(shareWithEmailSchema),
        mode: "onSubmit",
    })
    const isLoading = false
    const emailErrorMessageRoot = useRef<HTMLDivElement | null>(null)

    function onSubmit(data: ShareWithEmailFormData) {
        console.log(data)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
            noValidate
        >
            <div className={styles.inputWrapper}>
                <FormControl
                    control={
                        <Input
                            type="email"
                            placeholder="Enter email..."
                            touched={touchedFields.email}
                            valid={!errors.email}
                            {...register("email")}
                        />
                    }
                    error={errors.email?.message}
                    errorMessageRoot={emailErrorMessageRoot.current}
                />
                <Button type="submit" disabled={isLoading}>
                    Share file
                </Button>
            </div>
            <div ref={emailErrorMessageRoot}></div>
        </form>
    )
}

