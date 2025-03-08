import Icon from "@/ui/shared/Icon"
import Input from "@/ui/shared/Input"
import { IconName } from "@/ui/shared/Icon/types"
import styles from "./styles.module.scss"

export default function SearchInput() {
    return (
        <Input
            prependInner={
                <Icon name={IconName.Magnify} width="24px" height="24px" />
            }
            appendInner={
                <Icon name={IconName.Filter} width="24px" height="24px" />
            }
            placeholder="Search for files and folders by name..."
            inputClasses={styles.searchInput}
        />
    )
}

