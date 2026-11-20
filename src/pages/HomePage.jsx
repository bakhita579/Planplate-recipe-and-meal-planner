import { Link } from "react-router"
import { useEffect, useState } from "react"
import { searchMeals } from "../services/mealService"

function HomePage() {
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

    return (
        <div className="Home-container p-6">
            
            <header className="flex justify-between items-center mb-3">
                <div>
            <h1 className="font-bold">Home</h1>
            <h2>Discover recipes</h2>
            </div>
            <div className=" flex items-center">
                <Link to = "/Login">LogIn</Link>
                </div>
                </header>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && meals.length === 0 && (
        <p className="text-gray-500">No recipes found.</p>
      )}
            <ul className="Meal-card grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-6" >
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

export default HomePage 
