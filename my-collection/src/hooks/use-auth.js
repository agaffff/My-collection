import {getAuth,onAuthStateChanged} from "firebase/auth";
import {useState} from "react";

export function useAuth() {
    const [isAuth, setIsAuth] = useState(false);
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [id, setId] = useState("");

    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            // const uid = user.uid;
            setIsAuth(true);
            setEmail(user.email);
            setToken(user.token);
            setId(user.uid);
        } else {
            // User is signed out
            setIsAuth(false);
            setEmail("");
            setToken("");
            setId("");
        }
    });

    return {
        isAuth: isAuth,
        email: email,
        token: token,
        id: id,
    };
}