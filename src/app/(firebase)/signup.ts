import { FirebaseError } from "firebase/app";
import app from "./firebase";
import { User, UserCredential, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(app);


export default async function signUp(email:string, password:string) {
    let result:UserCredential | null = null,
        error:FirebaseError | null = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e:any) {
        error = e;
    }

    return { result, error };
}
export async function signUpWithGoogle() {
    const provider = new GoogleAuthProvider();
    let result : User = {} as User;
    let error:FirebaseError | null = null;
    try {
         await signInWithPopup(auth, provider).then((response) => {
            result = response.user;
        })
    } catch(err:any) {
            error = err;    
        };
   

    return { result, error };
}
