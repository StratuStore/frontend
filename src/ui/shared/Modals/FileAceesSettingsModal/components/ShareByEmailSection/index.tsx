import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"

import styles from "./styles.module.scss"
import UsersWithAccessList from "@/ui/shared/Modals/FileAceesSettingsModal/components/ShareByEmailSection/components/UsersWithAccessList"
import ShareWithEmailForm from "@/ui/shared/Modals/FileAceesSettingsModal/components/ShareByEmailSection/components/ShareWithEmailForm"

export default function ShareByEmailSection() {
    return (
        <div className={styles.sectionWrapper}>
            <div className={styles.sectionTitleWrapper}>
                <p className={styles.sectionTitle}>Share by email</p>
                <div className={styles.titleIconWrapper}>
                    <Icon
                        name={IconName.ShareVariant}
                        width="18px"
                        height="18px"
                    />
                </div>
            </div>
            <div className={styles.emailInputWrapper}>
                <ShareWithEmailForm />
            </div>
            <div className={styles.viewersWrapper}>
                <p className={styles.viewersTitle}>
                    Users, who already can access the file
                </p>
                <UsersWithAccessList />
            </div>
        </div>
    )
}

