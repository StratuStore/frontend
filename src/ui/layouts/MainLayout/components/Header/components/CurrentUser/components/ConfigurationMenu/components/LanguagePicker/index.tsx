import Select from "@/ui/shared/Select"

export default function LanguagePicker() {
    return (
        <Select
            placeholder="Select language..."
            items={[
                { label: "English", value: "en" },
                { label: "Ukrainian", value: "ua" },
            ]}
        />
    )
}

