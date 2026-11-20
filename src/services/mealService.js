const API_URL = "https://www.themealdb.com/api/json/v1/1"

export async function searchMeals(query) {
    const response = await fetch(`${API_URL}/search.php?s=${encodeURIComponent(query)}`)
    if  (!response.ok){
        throw new Error("Could not load recipe");
        
    }
    const data = await response.json()
    return data.meals ?? []
}
export async function getMealById(id) {
    const response = await fetch(`${API_URL}/lookup.php?i=${encodeURIComponent(id)}`)
    if  (!response.ok){
        throw new Error("Could not load recipe");
        
    }
    const data = await response.json()
    return data.meals ?? []
    
}