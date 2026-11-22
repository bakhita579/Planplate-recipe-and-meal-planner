import { useContext } from "react";
import { FavouriteContext } from "../context/FavouritesContext";

export function useFavourite() {
    const context = useContext(FavouriteContext)
    if (context === null) {
        throw new Error("favourite must be inside favouriteProvider");
        
    }
    return(context)

    
}