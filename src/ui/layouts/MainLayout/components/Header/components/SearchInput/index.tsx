import { mdiFilterVariant, mdiMagnify } from "@mdi/js"
import Icon from "@mdi/react"

import Input from "@/ui/shared/Input"

export default function SearchInput() {
    return (
        <Input
            prependInner={<Icon path={mdiMagnify} size={1} />}
            appendInner={<Icon path={mdiFilterVariant} size={1} />}
            placeholder="Search for files and folders by name..."
        />
    )
}

