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
import { File } from "@/entities/File"

export type FilePreviewModalProps = {
    open: boolean
    closeModal: () => void
    file?: File
    isSharedFile?: boolean
}

function FilePreviewModalComponent(props: FilePreviewModalProps) {
    const { open, closeModal, file, isSharedFile = false } = props

    useEffect(() => {
        if (!open || !file) {
            return
        }

        fileStore.loadDocumentPreview(file)

        return () => {
            fileStore.closeConnection(file)
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
                                onClick={() => fileStore.downloadFile(file)}
                            >
                                <Icon
                                    name={IconName.TrayArrowDown}
                                    width="24px"
                                    height="24px"
                                    className={styles.headerIcon}
                                />
                            </Button>

                            {!isSharedFile && (
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
                            )}
                        </div>

                        {fileStore.isDocumentPreviewLoading ? (
                            <div className={styles.spinnerContainer}>
                                <Spinner width="64px" height="64px" />
                            </div>
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

