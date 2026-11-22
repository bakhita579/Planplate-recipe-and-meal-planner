import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useFavourite } from "../../hooks/useFavourite";

function FavouriteButton({meals}) {
    const {user}= useAuth()
    const {isFavourite, addToFavourite, removeFromFavourite} = useFavourite()
    const [busy, setBusy]= useState(false)
    if(!user) return (null)
        const saved = isFavourite(meals.idMeal)

    async function handleClick() {
        setBusy(true)
        try {
           if (saved) {
            await removeFromFavourite(meals.idMeal)
          } else {
            await addToFavourite(meals)
          }
        } catch (error) {
            console.log(error.code);   
        }finally{
            setBusy(false)
        }  
    }
    return(
        <div className="fav">
    <button type="button" onClick={handleClick} disabled={busy} aria-pressed={saved}
    aria-label={`Save ${meals.strMeal} to Favourite`}><span aria-hidden="true" >{saved ? '♥' : '♡'}</span> </button>
    </div>
    )
    
}
export default FavouriteButton