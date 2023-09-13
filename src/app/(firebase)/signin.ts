import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "./firebase";
import { FirebaseError } from "firebase/app";
const auth = getAuth(app);

export default async function signIn(email:string, password:string) {
    let result = null,
        error:FirebaseError | null = null;
    try{
    await signInWithEmailAndPassword(auth, email, password).then((response) => {
        result=response.user;
    })
} catch (err:any) {
        error=err;
    };
    

    return { result, error };
}
