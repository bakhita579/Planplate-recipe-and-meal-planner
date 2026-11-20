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
                <div className="font-serif  text-gray-800">
            <h1 className="font-bold">Home</h1>
            <h2 >Discover recipes</h2>
            <p>Discover new recipes and plan your week
            </p>
            </div>
            <nav className="flex items-center justify-between px-2 py-2 border-b">
                <div className="flex items-centre gap-3 font-serif cursor-pointer">
                    <Link to = "/">Home</Link>
                    <Link to = "/Discover">Discover</Link>
                    <Link to = "/Favourite">Favourite</Link>
                    <Link to = "/Planner">planner</Link>
                    <Link to = "/Shopping-List">Shopping List</Link>
                </div>
            </nav>
            <div className=" flex items-center underline text-red-700 font-serif">
                <Link to = "/Login">LogIn</Link>
                </div>
                </header>
            {loading && <p className="font-serif">Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && meals.length === 0 && (
        <p className="text-gray-500">No recipes found.</p>
      )}
            <ul className="Meal-card grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-6" >
                {meals.map((meal) => (
                    <li key={meal.idMeal}>
                        <img src={meal.strMealThumb} alt={meal.strMeal} />
                        <h2 className="font-serif font-bold">{meal.strMeal}</h2>
                        <p>{meal.strCategory}</p>
                    </li>
                ))}
            </ul>
        </div>
       
        
    )
}

export default HomePage 
