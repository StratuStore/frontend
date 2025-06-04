import Picker from "rc-picker"
import en from "rc-picker/lib/locale/en_US"
import generateConfig from "./generateConfig"
import styles from "./styles.module.scss"
import "./picker.scss"

export default function DatePicker() {
    return (
        <Picker
            locale={en}
            open
            generateConfig={generateConfig}
            className={styles.wrapper}
            classNames={{
                popup: styles.popup,
            }}
        />
    )
}

