import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
    getFavourites,
    subscribeToFavourites,
    toggleFavourite,
} from "../../services/mealPlanStorage";

function RecipeCard({ meal, onAddToPlanner, fallbackCategory = "" }) {
    const [isFavourite, setIsFavourite] = useState(() =>
        getFavourites().includes(String(meal.idMeal))
    );
    const [favouriteError, setFavouriteError] = useState("");

    useEffect(() => {
        return subscribeToFavourites(() => {
            setIsFavourite(getFavourites().includes(String(meal.idMeal)));
        });
    }, [meal.idMeal]);

    function handleFavouriteClick() {
        try {
            setIsFavourite(toggleFavourite(meal.idMeal));
            setFavouriteError("");
        } catch (error) {
            console.error("Could not save favourite", error);
            setFavouriteError("Could not save this favourite.");
        }
    }

    return (
        <article className="recipe-card">
            <div className="card-image">
                <Link to={`/recipe/${meal.idMeal}`}>
                    <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
                </Link>
                <button
                    type="button"
                    className={`fav-btn${isFavourite ? " active" : ""}`}
                    aria-label={`${isFavourite ? "Remove" : "Add"} ${meal.strMeal} ${isFavourite ? "from" : "to"} favourites`}
                    aria-pressed={isFavourite}
                    onClick={handleFavouriteClick}
                >
                    ♥
                </button>
            </div>
            <div className="recipe-card-content">
                <Link to={`/recipe/${meal.idMeal}`}>
                    <h2>{meal.strMeal}</h2>
                </Link>
                <p className="recipe-meta">{meal.strCategory || fallbackCategory}</p>
                {favouriteError && (
                    <p className="planner-dialog-error" role="alert">
                        {favouriteError}
                    </p>
                )}
            </div>
            {onAddToPlanner && (
                <button
                    type="button"
                    className="plan-btn"
                    onClick={() => onAddToPlanner(meal)}
                >
                    + Add to planner
                </button>
            )}
        </article>
    );
}

export default RecipeCard