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
                setMeals(results)
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
        <>
            <h1 className="font-bold">Home</h1>
            <h2>Discover recipes</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {meals.map((meal) => (
                    <li key={meal.idMeal}>
                        <img src={meal.strMealThumb} alt={meal.strMeal} />
                        <h2>{meal.strMeal}</h2>
                        <p>{meal.strCategory}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default HomePage 
