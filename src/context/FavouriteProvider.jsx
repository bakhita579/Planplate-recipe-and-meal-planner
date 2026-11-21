import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { addFavourite } from "../services/favouriteService";
import { removeFavourite } from "../services/favouriteService";
import { subscribeToFavourites } from "../services/favouriteService";
import { FavouriteContext } from "./FavouritesContext";

function FavouriteProvider({children}) {
    const {user} = useAuth();
    const uid = user?.uid;
    const [favourite, setFavourite]= useState([])
    const [loading, setLoading]= useState(true)
    const [error, setError] = useState("")

    useEffect(()=>{
        if (!uid) {
            setFavourite([]);
            setLoading(false);
        return;
        }
            const unsubscribe = subscribeToFavourites(
        uid, (items)=>{setFavourite(items); setLoading(false);
            setError("")
        },
    (error)=>{console.log(error); setError("Could not load favourites");setLoading(false)
    },)
    return() => {
        if(typeof unsubscribe ==="function"){
            unsubscribe()}

            setFavourite([])
             setLoading(true)}
    }, [uid])

    function isFavourite(mealId) {
        return favourite.some ((items) =>items.idMeal ===mealId)
        
    }
    async function addToFavourite(meals) {
        await addFavourite(meals,uid)
        
    }
    async function removeFromFavourite(mealId) {
        await removeFavourite(mealId, uid)
        
    }
    return(
        <FavouriteContext.Provider value={{favourite, loading, error, isFavourite,addToFavourite,removeFromFavourite}}>
            {children}
        </FavouriteContext.Provider>
    )
}
export default FavouriteProvider