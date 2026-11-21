import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
 import {signOut as firebaseSignOut} from "firebase/auth";
import { auth } from "./firebase";
import firebase from "firebase/compat/app";

const googleProvider = new GoogleAuthProvider()

 export async function registerUser(email, password) {
    result = await createUserWithEmailAndPassword (auth, email, password)
    return result
}
export async function logIn(email, password) {
    result = await signInWithEmailAndPassword(auth, email, password)
    return result
    
}
export async function loginWithGoogle() {
    result = await signInWithPopup(auth, GoogleAuthProvider)
    return result
    
}
export async function signOut() {
    return  await firebaseSignOut(auth);
    
}
