import Button from "@/ui/shared/Button"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import Modal from "@/ui/shared/Modal"
import styles from "./styles.module.scss"
import AccessLevelSelectSection from "@/ui/shared/Modals/FileAceesSettingsModal/components/AccessLevelSelectSection"
import ShareByEmailSection from "@/ui/shared/Modals/FileAceesSettingsModal/components/ShareByEmailSection"

const renderAccessLevelSection = () => <AccessLevelSelectSection />
const renderShareByEmailSection = () => <ShareByEmailSection />

export default function FileAccessSettingsModal() {
    const renderTrigger = () => (
        <Button variant="icon">
            <Icon name={IconName.CogOutline} width="24px" height="24px" />
        </Button>
    )

    const renderHeading = () => (
        <div className={styles.headingWrapper}>
            <p>Share file</p>
            <p className={styles.subheading}>
                Get a link with which others can access the file
            </p>
        </div>
    )

    return (
        <Modal
            renderTrigger={renderTrigger}
            renderHeading={renderHeading}
            renderBodySections={[
                renderAccessLevelSection,
                renderShareByEmailSection,
            ]}
            contentClasses={styles.modalContent}
        />
    )
}

