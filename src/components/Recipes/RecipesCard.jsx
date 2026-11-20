import { Link } from "react-router";

function RecipeCard({meal}) {
    return(
        <article>
            <Link to = {`/recipe/${meal.idMeal}`}> 
            <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
            <h2 className="font-bold mt-2">{meal.strMeal}</h2>
            {meal.strCategory && <p>{meal.strCategory}</p>}
            </Link>
        </article>
    )
    
}
export default RecipeCard