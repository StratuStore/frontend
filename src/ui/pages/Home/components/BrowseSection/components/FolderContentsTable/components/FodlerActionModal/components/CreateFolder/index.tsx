import { useForm } from "react-hook-form"
import {
    createFolderFormSchema,
    CreateFolderFormValues,
    defaultValues,
} from "./constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { folderStore } from "@/entities/Folder/store"
import FormControl from "@/ui/shared/forms/FormControl"
import Input from "@/ui/shared/Input"
import { useTranslation } from "react-i18next"
import styles from "./styles.module.scss"
import Button from "@/ui/shared/Button"
import { observer } from "mobx-react-lite"

function CreateFolderComponent() {
    const {
        handleSubmit,
        formState: { errors, touchedFields },
        reset,
        register,
    } = useForm<CreateFolderFormValues>({
        resolver: zodResolver(createFolderFormSchema),
        defaultValues,
        mode: "onTouched",
    })

    const { t } = useTranslation("home")

    function onSubmit(data: CreateFolderFormValues) {
        folderStore.createFolder(data.name)
    }

    function handleClear() {
        reset(defaultValues)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.createFolderForm}
        >
            <div className={styles.formEntry}>
                <label htmlFor="name">
                    {t("createFolderModal.nameInputLabel")}
                </label>
                <FormControl
                    error={errors.name?.message}
                    control={
                        <Input
                            placeholder={t(
                                "createFolderModal.nameInputPlaceholder"
                            )}
                            touched={touchedFields.name}
                            valid={!errors.name}
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
                    disabled={folderStore.isActionLoading}
                >
                    {t("createFolderModal.clear")}
                </Button>

                <Button type="submit" loading={folderStore.isActionLoading}>
                    {t("createFolderModal.submit")}
                </Button>
            </div>
        </form>
    )
}

const CreateFolder = observer(CreateFolderComponent)
export default CreateFolder

