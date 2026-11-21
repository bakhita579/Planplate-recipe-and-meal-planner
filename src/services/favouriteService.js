import { collection } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { query } from "firebase/firestore";
import { orderBy } from "firebase/firestore";
import { db } from "./firebase";

export async function addFavourite(meal, uid) {
    await setDoc(doc(db, "users", uid, "favourites", meal.idMeal), {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        savedAt: Date.now()
    });
}
export async function removeFavourite(mealId, uid) {
    await deleteDoc(doc(db, "users", uid, "favourites", mealId));
}
export async function subscribeToFavourites(uid, onData, onError) {
    const q = query(
        collection(db, "users", uid, "favourites"),
        orderBy("savedAt", "desc")
    );
    return onSnapshot(
        q,
        (snapshot) => {
            onData(snapshot.docs.map((item) => item.data()));
        },
        onError
    );
}