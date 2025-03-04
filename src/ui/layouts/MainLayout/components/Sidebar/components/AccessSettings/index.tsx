import { observer } from "mobx-react-lite"
import styles from "./styles.module.scss"
import Button from "@/ui/shared/Button"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import avatarUrl from "@/assets/images/avatar.png"
import FileAccessebilityInfo from "@/ui/layouts/MainLayout/components/Sidebar/components/AccessSettings/components/FileAccessebilityInfo"
import { FileAccessebilityStatus } from "./components/FileAccessebilityInfo/types"

function AccessSettingsComponent() {
    return (
        <div className={styles.accessSettingsContainer}>
            <div className={styles.sectionHeaderWrapper}>
                <p className={styles.sectionHeader}>Access settings</p>
                <Button variant="icon">
                    <Icon
                        name={IconName.CogOutline}
                        width="24px"
                        height="24px"
                    />
                </Button>
            </div>

            <div className={styles.ownerInfoWrapper}>
                <img src={avatarUrl} className={styles.ownerAvatar} />
                <div className={styles.ownerInfo}>
                    <p>email@mail.com</p>
                    <p>Owner</p>
                </div>
            </div>

            <FileAccessebilityInfo
                status={FileAccessebilityStatus.Restricted}
            />
        </div>
    )
}

const AccessSettings = observer(AccessSettingsComponent)
export default AccessSettings

