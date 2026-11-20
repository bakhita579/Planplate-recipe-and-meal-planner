import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";
import { searchMeals } from "../services/mealService";

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
                <div>
                    <h1 className="font-bold">Discover</h1>
                    <h2>Discover recipes</h2>
            <p>Discover new recipes</p>
            <div className=" flex items-center underline text-red-700">
                <Link to = "/">Home</Link>
                </div>
                </div>
                </header>
                {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && meals.length === 0 && (
        <p className="text-gray-500">No recipes found.</p>
      )}
      <ul className="Meal-card grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-6" >
                {meals.map((meal) => (
                    <li key={meal.idMeal}>
                        <img src={meal.strMealThumb} alt={meal.strMeal} />
                        <h2>{meal.strMeal}</h2>
                        <p>{meal.strCategory}</p>
                    </li>
                ))}
            </ul>

                </div>
                
            
        )
            
    
}
export default Discover