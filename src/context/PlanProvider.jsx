import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { PlanContext } from "./planContext";
import { addPlanEntry } from "../services/planService";
import { updatePlanEntry } from "../services/planService";
import { deletePlanEntry } from "../services/planService";
import { subscribeToPlan } from "../services/planService";

function PlanProvider({children}) {
    const {user} = useAuth();
    const uid = user?.uid;
    const [entry, setEntry]= useState([])
    const [loading, setLoading]= useState(true)
    const [error, setError] = useState("")

    useEffect(()=>{
        if (!uid) {
            setEntry([]);
            setLoading(false);
        return;
        }
            const unsubscribe = subscribeToPlan(
        uid, (items)=>{setEntry(items); setLoading(false);
            setError("")
        },
    (error)=>{console.log(error); setError("Could not load meal plan");setLoading(false)
    },)
    return() => {
        if(typeof unsubscribe ==="function"){
            unsubscribe()}

            setEntry([])
             setLoading(true)}
    }, [uid])

    async function addEntry(entry) {
       await addPlanEntry(uid, entry)
        
    }
    async function updateEntry(entryId, changes) {
        await updatePlanEntry(uid, entryId, changes)
        
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