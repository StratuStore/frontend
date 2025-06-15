import Icon from "@/ui/shared/Icon"
import Input from "@/ui/shared/Input"
import { IconName } from "@/ui/shared/Icon/types"
import styles from "./styles.module.scss"
import FilteringOptionsPopover from "@/ui/layouts/MainLayout/components/Header/components/SearchInput/FilteringOptionsPopover"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react-lite"
import { folderStore } from "@/entities/Folder/store"
import { useLocation, useNavigate } from "react-router"
import Button from "@/ui/shared/Button"
import { useState } from "react"

function SearchInputComponent() {
    const { t } = useTranslation("common")
    const location = useLocation()
    const navigate = useNavigate()
    const [value, setValue] = useState<string | undefined>(undefined)

    const onSubmit = () => {
        if (location.pathname !== "/search") {
            navigate({
                pathname: "/search",
            })
        }

        folderStore.resetSearchPagination()
        folderStore.getSearchResults()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            folderStore.search.name = value || ""

            onSubmit()
        }
    }

    return (
        <Input
            prependInner={
                <Button variant="icon" onClick={onSubmit}>
                    <Icon name={IconName.Magnify} width="24px" height="24px" />
                </Button>
            }
            appendInner={<FilteringOptionsPopover />}
            placeholder={t("searchInput.placeholder")}
            inputClasses={styles.searchInput}
            value={value}
            onChange={(e) => {
                setValue(e.target.value.trim())
            }}
            onKeyDown={handleKeyDown}
        />
    )
}

const SearchInput = observer(SearchInputComponent)
export default SearchInput

