import { useForm } from "react-hook-form"
import {
    createRenameFolderFormSchema,
    RenameFolderFormValues,
    getDefaultValues,
} from "./constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { folderStore } from "@/entities/Folder/store"
import FormControl from "@/ui/shared/forms/FormControl"
import Input from "@/ui/shared/Input"
import { useTranslation } from "react-i18next"
import styles from "./styles.module.scss"
import Button from "@/ui/shared/Button"
import { observer } from "mobx-react-lite"
import { useMemo } from "react"
import { TEST_IDS } from "@/shared/constants/tests/shared"

function RenameFolderComponent() {
    const folder = folderStore.selectedFolders[0]
    const defaultValues = useMemo(
        () => getDefaultValues(folder.name),
        [folder.name]
    )
    const schema = useMemo(
        () => createRenameFolderFormSchema(folder.name),
        [folder.name]
    )

    const {
        handleSubmit,
        formState: { errors, touchedFields },
        reset,
        register,
    } = useForm<RenameFolderFormValues>({
        resolver: zodResolver(schema),
        defaultValues,
        mode: "onTouched",
    })

    const { t } = useTranslation("home")

    function onSubmit(data: RenameFolderFormValues) {
        folderStore.renameFolder(folder.id, data.name)
    }

    function handleClear() {
        reset(defaultValues)
    }

    if (!folder) {
        return
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.createFolderForm}
        >
            <div className={styles.formEntry}>
                <label htmlFor="name">
                    {t("renameFolderModal.nameInputLabel")}
                </label>
                <FormControl
                    error={errors.name?.message}
                    control={
                        <Input
                            placeholder={t(
                                "renameFolderModal.nameInputPlaceholder"
                            )}
                            touched={touchedFields.name}
                            valid={!errors.name}
                            data-testid={TEST_IDS.RenameFolderInput}
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
                    {t("renameFolderModal.clear")}
                </Button>

                <Button
                    type="submit"
                    loading={folderStore.isActionLoading}
                    data-testid={TEST_IDS.RenameFolderSubmitButton}
                >
                    {t("renameFolderModal.submit")}
                </Button>
            </div>
        </form>
    )
}

const RenameFolder = observer(RenameFolderComponent)
export default RenameFolder

