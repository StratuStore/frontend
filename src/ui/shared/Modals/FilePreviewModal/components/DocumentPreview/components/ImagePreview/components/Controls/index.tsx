import Button from "@/ui/shared/Button"
import styles from "./styles.module.scss"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import { RefObject } from "react"
import { ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch"

export type ControlsProps = {
    imageManager?: ReactZoomPanPinchContentRef
}

export default function Controls({ imageManager }: ControlsProps) {
    if (!imageManager) {
        return null
    }

    return (
        <div className={styles.controls}>
            <Button variant="icon" onClick={() => imageManager.zoomIn()}>
                <Icon name={IconName.Plus} width="20px" height="20px" />
            </Button>
            <Button
                variant="icon"
                onClick={() => imageManager.resetTransform()}
            >
                <Icon name={IconName.Restart} width="20px" height="20px" />
            </Button>
            <Button variant="icon" onClick={() => imageManager.zoomOut()}>
                <Icon name={IconName.Minus} width="20px" height="20px" />
            </Button>
        </div>
    )
}

