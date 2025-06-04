import { Dialog } from "radix-ui"
import styles from "./styles.module.scss"
import Button from "@/ui/shared/Button"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import FileBadge from "@/ui/shared/FileBadge"
import DocumentPreview from "@/ui/shared/Modals/FilePreviewModal/components/DocumentPreview"
import { fileStore } from "@/entities/File/store"
import { useEffect } from "react"
import Spinner from "@/ui/shared/Spinner"
import { observer } from "mobx-react-lite"
import FileAccessSettingsModal from "@/ui/shared/Modals/FileAceesSettingsModal"

export type FilePreviewModalProps = {
    open: boolean
    closeModal: () => void
}

function FilePreviewModalComponent(props: FilePreviewModalProps) {
    const { open, closeModal } = props
    const file = fileStore.selectedFiles[0]

    useEffect(() => {
        if (!open || !file) {
            return
        }

        fileStore.loadDocumentPreview()

        return () => {
            fileStore.closeConnection()
        }
    }, [open, file])

    if (!file) {
        return null
    }

    return (
        <>
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

                            <FileBadge name={file.name} />

                            <Button
                                variant="icon"
                                onClick={() => fileStore.downloadFile()}
                            >
                                <Icon
                                    name={IconName.TrayArrowDown}
                                    width="24px"
                                    height="24px"
                                    className={styles.headerIcon}
                                />
                            </Button>

                            <FileAccessSettingsModal
                                file={file}
                                renderTrigger={() => (
                                    <Button variant="icon">
                                        <Icon
                                            name={IconName.ShareVariant}
                                            width="24px"
                                            height="24px"
                                            className={styles.headerIcon}
                                        />
                                    </Button>
                                )}
                            />
                        </div>

                        {fileStore.isDocumentPreviewLoading ? (
                            <Spinner width="32px" height="32px" />
                        ) : (
                            <div className={styles.body}>
                                <DocumentPreview file={file} />
                            </div>
                        )}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}

const FilePreviewModal = observer(FilePreviewModalComponent)
export default FilePreviewModal

