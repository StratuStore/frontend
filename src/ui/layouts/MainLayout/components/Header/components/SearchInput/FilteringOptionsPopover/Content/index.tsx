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
    getDefaultValues,
} from "./constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"
import DateRangePicker from "@/ui/shared/shadcn/DateRangePicker"
import AccessLevelSelect from "@/ui/shared/AccessLevelSelect"
import { SearchDto } from "@/entities/Search/dto/SearchDto"
import { folderStore } from "@/entities/Folder/store"
import { useLocation, useNavigate } from "react-router"
import { AccessLevel } from "@/ui/shared/AccessLevelSelect/constants"

export default function Content() {
    const {
        handleSubmit,
        formState: { errors, touchedFields },
        reset,
        register,
        control,
    } = useForm<FilteringFormValues>({
        resolver: zodResolver(filteringFormSchema),
        defaultValues: getDefaultValues(),
    })

    const { t } = useTranslation("common")
    const navigate = useNavigate()
    const location = useLocation()

    const onSubmit = (data: FilteringFormValues) => {
        let accessLevel: boolean | undefined = undefined

        if (data.accessLevel === AccessLevel.Public) {
            accessLevel = true
        } else if (data.accessLevel === AccessLevel.Private) {
            accessLevel = false
        }

        const searchDto = new SearchDto({
            name: data.name,
            createdAtFrom: data.createdAtRange?.from,
            createdAtTo: data.createdAtRange?.to,
            updatedAtFrom: data.updatedAtRange?.from,
            updatedAtTo: data.updatedAtRange?.to,
            public: accessLevel,
            starred: data.isPinned ? true : undefined,
            extensions: data.extension.length > 0 ? data.extension : undefined,
        })

        if (location.pathname !== "/search") {
            navigate({
                pathname: "/search",
            })
        }

        folderStore.resetSearchPagination()
        folderStore.setSearchFilters(searchDto)
        folderStore.getSearchResults()
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
                <label htmlFor="createdAtRange">
                    {t("filteringOptionsPopover.createdAtRange")}
                </label>
                <FormControl
                    control={
                        <Controller
                            name="createdAtRange"
                            control={control}
                            render={({ field }) => (
                                <DateRangePicker
                                    // @ts-expect-error mistake in react-day-picker types
                                    date={field.value}
                                    setDate={field.onChange}
                                />
                            )}
                        />
                    }
                />
            </div>

            <div className={styles.formEntry}>
                <label htmlFor="updatedAtRange">
                    {t("filteringOptionsPopover.updatedAtRange")}
                </label>
                <FormControl
                    control={
                        <Controller
                            name="updatedAtRange"
                            control={control}
                            render={({ field }) => (
                                <DateRangePicker
                                    // @ts-expect-error mistake in react-day-picker types
                                    date={field.value}
                                    setDate={field.onChange}
                                />
                            )}
                        />
                    }
                />
            </div>

            <div className={styles.formEntry}>
                <label htmlFor="accessLevel">
                    {t("filteringOptionsPopover.accessLevel")}
                </label>
                <FormControl
                    control={
                        <Controller
                            name="accessLevel"
                            control={control}
                            render={({ field }) => (
                                <AccessLevelSelect
                                    level={field.value!}
                                    setLevel={field.onChange}
                                    triggerClassName="!justify-start"
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

