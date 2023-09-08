import app from "./firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(app);


export default async function signUp(email, password) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
export async function signUpWithGoogle() {
    const provider = new GoogleAuthProvider();
    let result = null,
        error = null;
    
         await signInWithPopup(auth, provider).then((response) => {
            const credential = GoogleAuthProvider.credentialFromResult(response);
            const token = credential.accessToken;
            const user = response.user;
            result = user;
        }).catch((err) => {
            error = err;    
        });
   

    return { result, error };
}
