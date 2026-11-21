import { Link } from "react-router"
import { useFavourite } from "../hooks/useFavourite"
import RecipeCard from "../components/Recipes/RecipesCard"

function Favourite() {
    const {favourite, loading,error} = useFavourite()

    return(
        <>
        <h2>Favourites</h2>
        {loading && <p role="status" className="font-serif text-l italic">loading favourites...</p>}
        {error && <p role="alert">{error}</p>}
                {!loading && !error && favourite.length === 0 && (
                        <p className="font-serif italic ">No recipes saved. <Link to="/Discover">Find recipes</Link></p>
                )}
                {favourite.length > 0 && <ul className="Meal-card grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-6">
                            {favourite.map((items) => (<li key={items.idMeal}>
                                <RecipeCard meal={items}/></li>))}
                
            </ul>}
        </>
    )
    
}

export default Favourite