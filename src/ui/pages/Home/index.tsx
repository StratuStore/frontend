import PinnedItemsSection from "@/ui/pages/Home/components/PinnedItemsSection"
import BrowseSection from "@/ui/pages/Home/components/BrowseSection"
import SectionBreak from "@/ui/shared/SectionBreak"
import FilePropertiesSidebar from "@/ui/shared/FilePropertiesSidebar"
import styles from "./styles.module.scss"

function HomePageComponent() {
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

// const HomePage = withAuthGuard(HomePageComponent)
const HomePage = HomePageComponent
export default HomePage

