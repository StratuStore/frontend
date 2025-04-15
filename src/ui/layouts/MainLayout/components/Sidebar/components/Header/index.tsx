import { File } from "@/entities/File"
import { observer } from "mobx-react-lite"
import styles from "./styles.module.scss"
import FileBadge from "@/ui/shared/FileBadge"
import Button from "@/ui/shared/Button"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import { fileStore } from "@/entities/File/store"

export type HeaderProps = {
    file: File
}

function HeaderComponent({ file }: HeaderProps) {
    function handleClose() {
        fileStore.deselectFile()
    }

    return (
        <div className={styles.headerWrapper}>
            <FileBadge name={file.name} />
            <Button variant="icon" onClick={handleClose}>
                <Icon name={IconName.WindowClose} width="24px" height="24px" />
            </Button>
        </div>
    )
}

const Header = observer(HeaderComponent)
export default Header

