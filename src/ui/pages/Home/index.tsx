import PinnedItemsSection from "@/ui/pages/Home/components/PinnedItemsSection"
import BrowseSection from "@/ui/pages/Home/components/BrowseSection"
import SectionBreak from "@/ui/shared/SectionBreak"
import FilePropertiesSidebar from "@/ui/shared/FilePropertiesSidebar"
import styles from "./styles.module.scss"

export default function HomePage() {
    return (
        <>
            <div className={styles.pinnedItemsSectionWrapper}>
                <PinnedItemsSection />
            </div>
            <SectionBreak />
            <div className={styles.browseSectionWrapper}>
                <BrowseSection />
            </div>
            <FilePropertiesSidebar />
        </>
    )
}

