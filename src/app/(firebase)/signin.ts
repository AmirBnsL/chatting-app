import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "./firebase";
const auth = getAuth(app);

export default async function signIn(email, password) {
    let result = null,
        error = null;
    
    await signInWithEmailAndPassword(auth, email, password).then((response) => {
        result=response.user;
    }).catch((err) => {
        error=err;
    });
    

    return { result, error };
}
