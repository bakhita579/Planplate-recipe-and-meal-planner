import { Link } from "react-router";
import FavouriteButton from "./FavouriteButton";

function RecipeCard({meal}) {
    return(
        <article className="relative">
            <Link to = {`/recipe/${meal.idMeal}`}> 
            <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
            <h2 className="font-bold mt-2 font-serif">{meal.strMeal}</h2>
            {meal.strCategory && <p >{meal.strCategory}</p>}
            </Link>
            <div className="absolute right-3 top-2">
                <FavouriteButton meals = {meal}/>
            </div>
        </article>
    )
    
}
export default RecipeCard