import { Dialog } from "radix-ui"
import styles from "./styles.module.scss"
import Button from "@/ui/shared/Button"
import Icon from "@/ui/shared/Icon"
import { IconName } from "@/ui/shared/Icon/types"
import clsx from "clsx"

type BodySectionComponent = () => React.ReactNode

export type ModalProps = {
    renderTrigger: () => React.ReactNode
    renderHeading: () => React.ReactNode
    renderBodySections: BodySectionComponent[]
    contentClasses?: string
}

export default function Modal({
    renderTrigger,
    renderHeading,
    renderBodySections,
    contentClasses,
}: ModalProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>{renderTrigger()}</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.overlay} />

                <Dialog.Content
                    className={clsx(styles.content, contentClasses)}
                >
                    <div className={styles.heading}>{renderHeading()}</div>
                    <div className={styles.body}>
                        {renderBodySections.map((renderBodySection, index) => (
                            <div key={index} className={styles.bodySection}>
                                {renderBodySection()}
                            </div>
                        ))}
                    </div>

                    <Dialog.Close asChild className={styles.closeButtonWrapper}>
                        <Button variant="icon">
                            <Icon
                                name={IconName.WindowClose}
                                width="24px"
                                height="24px"
                            />
                        </Button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

