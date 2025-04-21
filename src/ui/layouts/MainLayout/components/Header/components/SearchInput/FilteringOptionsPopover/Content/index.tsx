import FormControl from "@/ui/shared/forms/FormControl"
import styles from "./styles.module.scss"
import Input from "@/ui/shared/Input"
import TagsInput from "@/ui/shared/TagsInput"
import { Checkbox } from "@/ui/shared/Checkbox"
import Button from "@/ui/shared/Button"
import { useForm, Controller } from "react-hook-form"
import {
    defaultValues,
    filteringFormSchema,
    FilteringFormValues,
} from "./constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"

export default function Content() {
    const {
        handleSubmit,
        formState: { errors, touchedFields },
        reset,
        register,
        control,
    } = useForm<FilteringFormValues>({
        resolver: zodResolver(filteringFormSchema),
        defaultValues,
    })

    const { t } = useTranslation("common")

    const onSubmit = (data: FilteringFormValues) => {
        console.log("Form submitted with data:", data)
    }

    const handleClear = () => {
        reset(defaultValues)
    }

    return (
        <form
            className={styles.filteringOptionsForm}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className={styles.formEntry}>
                <label htmlFor="name">
                    {t("filteringOptionsPopover.name")}
                </label>
                <FormControl
                    error={errors.name?.message}
                    control={
                        <Input
                            placeholder={t(
                                "filteringOptionsPopover.namePlaceholder"
                            )}
                            touched={touchedFields.name}
                            valid={!errors.name}
                            {...register("name")}
                        />
                    }
                />
            </div>

            <div className={styles.formEntry}>
                <label htmlFor="extension">
                    {t("filteringOptionsPopover.fileExtension")}
                </label>
                <FormControl
                    error={errors.extension?.[0]?.message}
                    control={
                        <Controller
                            name="extension"
                            control={control}
                            render={({ field }) => (
                                <TagsInput
                                    inputPlaceholder={t(
                                        "filteringOptionsPopover.fileExtensionPlaceholder"
                                    )}
                                    allowDuplicates={false}
                                    delimiters={[",", "Enter", " "]}
                                    valid={!errors.extension}
                                    {...field}
                                />
                            )}
                        />
                    }
                />
            </div>

            <div className={styles.formEntry}>
                <label htmlFor="sharedWith">
                    {t("filteringOptionsPopover.sharedWith")}
                </label>
                <FormControl
                    error={errors.sharedWith?.[0]?.message}
                    control={
                        <Controller
                            name="sharedWith"
                            control={control}
                            render={({ field }) => (
                                <TagsInput
                                    inputPlaceholder={t(
                                        "filteringOptionsPopover.sharedWithPlaceholder"
                                    )}
                                    allowDuplicates={false}
                                    delimiters={[",", "Enter", " "]}
                                    valid={!errors.extension}
                                    {...field}
                                />
                            )}
                        />
                    }
                />
            </div>

            <div className={styles.formEntry}>
                <label htmlFor="isPinned">
                    {t("filteringOptionsPopover.showOnlyPinned")}
                </label>
                <FormControl
                    error={errors.isPinned?.message}
                    control={
                        <Controller
                            name="isPinned"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    className={styles.isPinnedCheckbox}
                                    checked={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                />
                            )}
                        />
                    }
                />
            </div>

            <div className={styles.submitRow}>
                <Button variant="ghost" type="button" onClick={handleClear}>
                    {t("filteringOptionsPopover.clear")}
                </Button>
                <Button type="submit">
                    {t("filteringOptionsPopover.apply")}
                </Button>
            </div>
        </form>
    )
}

