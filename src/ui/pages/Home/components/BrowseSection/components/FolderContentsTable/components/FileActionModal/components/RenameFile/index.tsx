import { useForm } from "react-hook-form"
import {
    createRenameFileFormSchema,
    RenameFileFormValues,
    getDefaultValues,
} from "./constants"
import { zodResolver } from "@hookform/resolvers/zod"
import FormControl from "@/ui/shared/forms/FormControl"
import Input from "@/ui/shared/Input"
import { useTranslation } from "react-i18next"
import styles from "./styles.module.scss"
import Button from "@/ui/shared/Button"
import { observer } from "mobx-react-lite"
import { useMemo } from "react"
import { fileStore } from "@/entities/File/store"
import { TEST_IDS } from "@/shared/constants/tests/shared"

function RenameFileComponent() {
    const file = fileStore.selectedFiles[0]
    const defaultValues = useMemo(
        () => getDefaultValues(file.name),
        [file.name]
    )

    const schema = useMemo(
        () => createRenameFileFormSchema(file.name),
        [file.name]
    )

    const {
        handleSubmit,
        formState: { errors, touchedFields },
        reset,
        register,
    } = useForm<RenameFileFormValues>({
        resolver: zodResolver(schema),
        defaultValues,
        mode: "onTouched",
    })

    const { t } = useTranslation("home")

    function onSubmit(data: RenameFileFormValues) {
        fileStore.renameFile(file.id, data.name)
    }

    function handleClear() {
        reset(defaultValues)
    }

    if (!file) {
        return
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.createFolderForm}
        >
            <div className={styles.formEntry}>
                <label htmlFor="name">
                    {t("renameFileModal.nameInputLabel")}
                </label>
                <FormControl
                    error={errors.name?.message}
                    control={
                        <Input
                            placeholder={t(
                                "renameFileModal.nameInputPlaceholder"
                            )}
                            touched={touchedFields.name}
                            valid={!errors.name}
                            data-testid={TEST_IDS.RenameFileInput}
                            {...register("name")}
                        />
                    }
                />
            </div>

            <div className={styles.submitRow}>
                <Button
                    variant="ghost"
                    type="button"
                    onClick={handleClear}
                    disabled={fileStore.isActionLoading}
                >
                    {t("renameFileModal.clear")}
                </Button>

                <Button
                    type="submit"
                    loading={fileStore.isActionLoading}
                    data-testid={TEST_IDS.RenameFileSubmitButton}
                >
                    {t("renameFileModal.submit")}
                </Button>
            </div>
        </form>
    )
}

const RenameFile = observer(RenameFileComponent)
export default RenameFile

