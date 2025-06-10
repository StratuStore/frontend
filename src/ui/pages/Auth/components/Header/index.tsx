import Popover from "@/ui/shared/Popover"
import Button from "@/ui/shared/Button"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import ConfigurationMenu from "@/ui/layouts/MainLayout/components/Header/components/QuickActions/components/ConfigurationMenu"
import styles from "./styles.module.scss"

export default function Header() {
    return (
        <div className={styles.header}>
            <Popover
                renderTrigger={() => (
                    <Button variant="icon">
                        <Icon
                            name={IconName.CogOutline}
                            width="24px"
                            height="24px"
                        />
                    </Button>
                )}
                renderContent={() => <ConfigurationMenu />}
            />
        </div>
    )
}

