import Header from "@/ui/layouts/MainLayout/components/Header"

import styles from "./styles.module.scss"
import SectionBreak from "@/ui/shared/SectionBreak"
import Sidebar from "@/ui/layouts/MainLayout/components/Sidebar"
import { observer } from "mobx-react-lite"
import { Outlet } from "react-router"

function MainLayoutComponent() {
    return (
        <div className={styles.mainLayoutContainer}>
            <div className={styles.content}>
                <Header />
                <SectionBreak />
                <Outlet />
            </div>

            <Sidebar />
        </div>
    )
}

const MainLayout = observer(MainLayoutComponent)
export default MainLayout

