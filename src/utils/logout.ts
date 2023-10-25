import { deleteCookie } from "cookies-next";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const logout = async () => {
    signOut(auth)
        .then(() => {
            deleteCookie('token');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
        });
}

export default logout;