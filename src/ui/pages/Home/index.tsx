import Icon from "@mdi/react"
import { mdiFilterVariant, mdiMagnify } from "@mdi/js"

import { Input } from "@/ui/shared/Input"

import styles from "./styles.module.scss"

export default function HomePage() {
    return (
        <div className={styles.homePageContainer}>
            <div>
                <Input
                    prependInner={<Icon path={mdiMagnify} size={1} />}
                    appendInner={<Icon path={mdiFilterVariant} size={1} />}
                />
            </div>
        </div>
    )
}

