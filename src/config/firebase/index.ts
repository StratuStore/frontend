import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBrRBGcEvGMlIk2g9MDMWWg5NMH1DbWV1M",
    authDomain: "stratustore.firebaseapp.com",
    projectId: "stratustore",
    storageBucket: "stratustore.firebasestorage.app",
    messagingSenderId: "974869445708",
    appId: "1:974869445708:web:b191b9b5c1dcc554f448e9",
}

const firebase = initializeApp(firebaseConfig)

const authProvider = new GoogleAuthProvider()

authProvider.addScope("email")
authProvider.addScope("profile")
authProvider.addScope("openid")
authProvider.addScope("https://www.googleapis.com/auth/userinfo.profile")
authProvider.addScope("https://www.googleapis.com/auth/userinfo.email")

const auth = getAuth()

export { firebase, auth, authProvider }

