import { Dialog } from "radix-ui"
import styles from "./styles.module.scss"
import Button from "@/ui/shared/Button"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import FileBadge from "@/ui/shared/FileBadge"
import DocumentPreview from "@/ui/shared/Modals/FilePreviewModal/components/DocumentPreview"
import image from "./static-test/image.jpg"
import video from "./static-test/video.mp4"
import audio from "./static-test/audio.mp3"

const files = [image, video, audio]

export type FilePreviewModalProps = {
    open: boolean
    closeModal: () => void
}

export default function FilePreviewModal(props: FilePreviewModalProps) {
    const { open, closeModal } = props

    return (
        <Dialog.Root open={open}>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.overlay} />

                <Dialog.Content
                    className={styles.content}
                    onEscapeKeyDown={closeModal}
                >
                    <div className={styles.header}>
                        <Dialog.Close
                            asChild
                            className={styles.closeButtonWrapper}
                        >
                            <Button variant="icon" onClick={closeModal}>
                                <Icon
                                    name={IconName.WindowClose}
                                    width="24px"
                                    height="24px"
                                    className={styles.headerIcon}
                                />
                            </Button>
                        </Dialog.Close>

                        <FileBadge name="File name" />

                        <Button variant="icon">
                            <Icon
                                name={IconName.TrayArrowDown}
                                width="24px"
                                height="24px"
                                className={styles.headerIcon}
                            />
                        </Button>

                        <Button variant="icon">
                            <Icon
                                name={IconName.ShareVariant}
                                width="24px"
                                height="24px"
                                className={styles.headerIcon}
                            />
                        </Button>
                    </div>

                    <div className={styles.body}>
                        <DocumentPreview uri={files[2]} extension="mp3" />
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

