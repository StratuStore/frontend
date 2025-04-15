import { fileStore } from "@/entities/File/store"
import clsx from "clsx"
import { observer } from "mobx-react-lite"
import styles from "./styles.module.scss"
import Header from "./components/Header"
import AccessSettings from "@/ui/layouts/MainLayout/components/Sidebar/components/AccessSettings"

function SidebarComponent() {
    const activeFile = fileStore.activeFile
    const isOpen = Boolean(activeFile)

    if (!isOpen) {
        return null
    }

    return (
        <div
            className={clsx(styles.sidebarContainer, {
                [styles.open]: isOpen,
            })}
        >
            <div className={styles.sidebarContent}>
                {activeFile && (
                    <>
                        <Header file={activeFile} />
                        <AccessSettings />
                        <div className="fileDetails"></div>
                    </>
                )}
            </div>
        </div>
    )
}

const Sidebar = observer(SidebarComponent)
export default Sidebar

