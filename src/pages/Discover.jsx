import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";
import { searchMeals } from "../services/mealService";
import RecipeCard from "../components/Recipes/RecipesCard";

function Discover() {
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
            async function loadMeal() {
                try {
                    const results = await searchMeals("chicken")
                    setMeals(Array.isArray(results) ? results : results ?.meals || [])
                } catch (error) {
                    console.error("could not load recipe", error)
                    setError("Could not load recipes")
                } finally {
                    setLoading(false)
                }
            }
    
            loadMeal()
        }, [])
    
        return(
            <div className="Discover-container">
                <header className="flex justify-between items-center mb-3">
                <div className="text-gray-800 font-serif flex-wrap justify-center items-center">
                    <h1 >Discover</h1>
                    <h2 >Discover recipes</h2>
            <p>Discover new recipes</p>
            <div className=" flex items-center underline text-red-700 font-serif">
                <Link to = "/">Home</Link>
                </div>
                </div>
                </header>
                {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && meals.length === 0 && (
        <p className="text-gray-500 font-serif">No recipes found.</p>
      )}
      <ul className="Meal-card grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-6" >
                {meals.map((meal) => (
                    <li key={meal.idMeal}><RecipeCard meal={meal} className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif"/></li>
                ))}
            </ul>

                </div>
                
            
        )
            
    
}
export default Discover