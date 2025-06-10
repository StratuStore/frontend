import Icon from "@/ui/shared/Icon"
import styles from "./styles.module.scss"
import { IconName } from "@/ui/shared/Icon/types"
import GoogleLoginButton from "@/ui/pages/Auth/components/GoogleLoginButton"
import banner from "@/assets/images/banner.jpg"
import Header from "./components/Header"

export default function AuthPage() {
    return (
        <div className={styles.authPageWrapper}>
            <img src={banner} className={styles.banner} />
            <div className={styles.content}>
                <Header />
                <div className={styles.body}>
                    <p className={styles.title}>Welcome to</p>
                    <p className={styles.appName}>
                        Stratustore
                        <Icon
                            name={IconName.Creation}
                            className={styles.appNameIcon}
                        />
                        <svg width="0" height="0">
                            <linearGradient
                                id="app-name-gradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop stopColor="#4169E1" offset="0%" />
                                <stop stopColor="#8A2BE2" offset="100%" />
                            </linearGradient>
                        </svg>
                    </p>
                    <p className={styles.login}>
                        Please, log in using your Google account
                    </p>
                    <GoogleLoginButton />
                </div>
            </div>
        </div>
    )
}

