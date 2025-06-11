import Popover from "@/ui/shared/Popover"
import styles from "./styles.module.scss"
import ConfigurationMenu from "./components/ConfigurationMenu"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import Button from "@/ui/shared/Button"
import { authStore } from "@/entities/Auth/store"
import { useNavigate } from "react-router"
import { observer } from "mobx-react-lite"
import { TEST_HEADER } from "@/shared/constants/tests/header"

function QuickActionsComponent() {
    const navigate = useNavigate()

    async function handleLogout() {
        await authStore.logout()
        navigate("/sso")
    }

    return (
        <div className={styles.quickActionsContainer}>
            <Popover
                renderTrigger={() => (
                    <Button
                        variant="icon"
                        data-testid={TEST_HEADER.SettingsTrigger}
                    >
                        <Icon
                            name={IconName.CogOutline}
                            width="24px"
                            height="24px"
                        />
                    </Button>
                )}
                renderContent={() => <ConfigurationMenu />}
            />
            <Button
                variant="icon"
                onClick={handleLogout}
                disabled={authStore.isLoading}
            >
                <Icon name={IconName.Logout} width="24px" height="24px" />
            </Button>
        </div>
    )
}

const QuickActions = observer(QuickActionsComponent)
export default QuickActions

