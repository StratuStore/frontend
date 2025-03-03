import { ReactNode } from "react"

import Header from "@/ui/layouts/MainLayout/components/Header"

import styles from "./styles.module.scss"
import SectionBreak from "@/ui/shared/SectionBreak"
import Sidebar from "@/ui/layouts/MainLayout/components/Sidebar"
import { observer } from "mobx-react-lite"

export type MainLayoutProps = {
    children: ReactNode
}

function MainLayoutComponent({ children }: MainLayoutProps) {
    return (
        <div className={styles.mainLayoutContainer}>
            <div className={styles.content}>
                <Header />
                <SectionBreak />
                {children}
            </div>

            <Sidebar />
        </div>
    )
}

const MainLayout = observer(MainLayoutComponent)
export default MainLayout

