import { ReactNode } from "react"

import Header from "@/ui/layouts/MainLayout/components/Header"

import styles from "./styles.module.scss"
import SectionBreak from "@/ui/shared/SectionBreak"

export type MainLayoutProps = {
    children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className={styles.mainLayoutContainer}>
            <Header />
            <SectionBreak />
            {children}
        </div>
    )
}

