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
                <label htmlFor="name">Name</label>
                <FormControl
                    error={errors.name?.message}
                    control={
                        <Input
                            placeholder="Enter item name..."
                            touched={touchedFields.name}
                            valid={!errors.name}
                            {...register("name")}
                        />
                    }
                />
            </div>
            <div className={styles.formEntry}>
                <label htmlFor="extension">File extension</label>
                <FormControl
                    error={errors.extension?.[0]?.message}
                    control={
                        <Controller
                            name="extension"
                            control={control}
                            render={({ field }) => (
                                <TagsInput
                                    inputPlaceholder="Add a file extension..."
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
                <label htmlFor="sharedWith">Also shared with</label>
                <FormControl
                    error={errors.sharedWith?.[0]?.message}
                    control={
                        <Controller
                            name="sharedWith"
                            control={control}
                            render={({ field }) => (
                                <TagsInput
                                    inputPlaceholder="Add a file extension..."
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
                <label htmlFor="isPinned">Show only pinned items</label>
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
                    Clear
                </Button>
                <Button type="submit">Apply filters</Button>
            </div>
        </form>
    )
}

