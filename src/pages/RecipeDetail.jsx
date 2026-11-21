import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";
import { getIngredients } from "../utils/getIngredients";
import { getMealById } from "../services/mealService";
import { useParams } from "react-router";
import FavouriteButton from "../components/Recipes/FavouriteButton";

function RecipeDetails() {
    const {recipeId} = useParams()
    const [meal, setMeal] = useState(null)
    const [loading, setLoading] = useState(true)
        const [error, setError] = useState("")

        useEffect(()=>{
            let ignore = false
            async function loadMeal() {
                setLoading(true)
                setError("")
                try {
                    const response = await getMealById(recipeId)
                   if (!ignore) {
                const foundMeal = response?.meals ? response.meals[0] : Array.isArray(response) ? response[0] : response;
                    setMeal(foundMeal || null);}
                } catch (error) {
            if (!ignore) setError("Could not load recipes please try again")
            
                    
                }finally{
                    if (!ignore) setLoading(false)
                }

                
            }
            loadMeal()
            return ()=>{ignore = true}

        }, [recipeId])
        
            if(loading)
                return(
            <p className="font-serif italic ">Recide loading ...</p> 
        )
        if (error) return(
            <p role="alert">{error}</p>
        )
        if (!meal) return(
            <div>
                <p className="font-serif italic">Recipe not found</p>
                <Link to= "/Discover" className="text-red-600 underline" >Back to Discover</Link>
            </div>
        )
    
    return(
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to= "/Discover" className="text-red-600 underline font-serif">Back to Discover</Link>
             
             <div className="bg-white rounded-2xl shadow-sm border border-black overflow-hidden">
             <div className="grid grid-cols-1 md:grid-cols-2"> 
            
            <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy"className="w-full h-72 md:h-full object-cover"/>
             <div className="p-4 sm:p-5 flex flex-col justify-center">
            {meal.strCategory && (
                <p className="self-start bg-red-50 text-red-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">{meal.strCategory}
                </p>)} 
             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">{meal.strMeal}</h1> 
              <FavouriteButton meals = {meal}/>
            </div> 
            </div>  
            <div className="p-5 sm:p-7 border-t border-black">  
        <h2 className="text-3xl font-bold text-black mb-3 font-serif">Recipe Details</h2>
        <p className="text-gray-950 font-serif whitespace-pre-line">{meal.strInstructions}</p>
        </div>
        </div>
        </div> 
    )
    
}
export default RecipeDetails