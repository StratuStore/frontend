import Icon from "@/ui/shared/Icon"
import Input from "@/ui/shared/Input"
import { IconName } from "@/ui/shared/Icon/types"
import styles from "./styles.module.scss"
import FilteringOptionsPopover from "@/ui/layouts/MainLayout/components/Header/components/SearchInput/FilteringOptionsPopover"
import { useTranslation } from "react-i18next"

export default function SearchInput() {
    const { t } = useTranslation("common")

    return (
        <Input
            prependInner={
                <Icon name={IconName.Magnify} width="24px" height="24px" />
            }
            appendInner={<FilteringOptionsPopover />}
            placeholder={t("searchInput.placeholder")}
            inputClasses={styles.searchInput}
        />
    )
}

