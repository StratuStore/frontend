import { useCallback, useEffect, useMemo, useState } from "react"
import {
    TransformWrapper,
    TransformComponent,
    ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch"
import Controls from "./components/Controls"
import { File } from "@/entities/File"

export type ImagePreviewProps = {
    file: File
}

export default function ImagePreview({ file }: ImagePreviewProps) {
    const zoomFactor = 8
    const scaleUp = true

    const [container, setContainer] = useState<HTMLDivElement | null>(null)

    const [containerWidth, setContainerWidth] = useState<number>(0)
    const [containerHeight, setContainerHeight] = useState<number>(0)

    const [imageNaturalWidth, setImageNaturalWidth] = useState<number>(0)
    const [imageNaturalHeight, setImageNaturalHeight] = useState<number>(0)

    const [imageRef, setImageRef] = useState<ReactZoomPanPinchContentRef>()

    const imageScale = useMemo(() => {
        if (
            containerWidth === 0 ||
            containerHeight === 0 ||
            imageNaturalWidth === 0 ||
            imageNaturalHeight === 0
        )
            return 0
        const scale = Math.min(
            (containerWidth - 32) / imageNaturalWidth,
            (containerHeight - 64) / imageNaturalHeight
        )
        return scaleUp ? scale : Math.max(scale, 1)
    }, [
        scaleUp,
        containerWidth,
        containerHeight,
        imageNaturalWidth,
        imageNaturalHeight,
    ])

    const handleResize = useCallback(() => {
        if (container !== null) {
            const rect = container.getBoundingClientRect()
            setContainerWidth(rect.width)
            setContainerHeight(rect.height)
        } else {
            setContainerWidth(0)
            setContainerHeight(0)
        }
    }, [container])

    const handleImageOnLoad = (image: HTMLImageElement) => {
        setImageNaturalWidth(image.naturalWidth)
        setImageNaturalHeight(image.naturalHeight)
    }

    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [handleResize])

    useEffect(() => {
        const image = new Image()
        image.onload = () => handleImageOnLoad(image)
        image.src = file.getUrl()
    }, [file])

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
            }}
            ref={(el: HTMLDivElement | null) => setContainer(el)}
        >
            {imageScale > 0 && (
                <TransformWrapper
                    initialScale={imageScale}
                    minScale={imageScale}
                    maxScale={imageScale * zoomFactor}
                    maxPositionY={0}
                    centerOnInit
                    onInit={(ref) => {
                        setImageRef(ref)
                    }}
                >
                    <TransformComponent
                        wrapperStyle={{
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <img src={file.getUrl()} />
                    </TransformComponent>
                </TransformWrapper>
            )}

            <Controls imageManager={imageRef} />
        </div>
    )
}

