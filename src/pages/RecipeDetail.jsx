import { useParams } from "react-router";

function RecipeDetails() {
    const {recipeId} = useParams()
    return(
        <>
        <h2>Recipe Details</h2>
        </>
    )
    
}
export default RecipeDetails