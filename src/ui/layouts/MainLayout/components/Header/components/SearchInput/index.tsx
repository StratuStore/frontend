import Icon from "@/ui/shared/Icon"
import Input from "@/ui/shared/Input"
import { IconName } from "@/ui/shared/Icon/types"
import styles from "./styles.module.scss"
import FilteringOptionsPopover from "@/ui/layouts/MainLayout/components/Header/components/SearchInput/FilteringOptionsPopover"

export default function SearchInput() {
    return (
        <Input
            prependInner={
                <Icon name={IconName.Magnify} width="24px" height="24px" />
            }
            appendInner={<FilteringOptionsPopover />}
            placeholder="Search for files and folders by name..."
            inputClasses={styles.searchInput}
        />
    )
}

