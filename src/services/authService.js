import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
 import {signOut as firebaseSignOut} from "firebase/auth";
import { auth } from "./firebase";


const googleProvider = new GoogleAuthProvider()

 export async function registerUser(email, password) {
   const  result = await createUserWithEmailAndPassword (auth, email, password)
    return result
}
export async function logIn(email, password) {
   const  result = await signInWithEmailAndPassword(auth, email, password)
    return result
    
}
export async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider)
    return result
    
}
export async function signOut() {
    return  await firebaseSignOut(auth);
    
}
