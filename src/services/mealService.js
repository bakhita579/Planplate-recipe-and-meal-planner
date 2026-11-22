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
    return data.meals?.[0] ?? null
}
    
export async function getCategories() {
    const response = await fetch (`${API_URL}/list.php?c=list`)
    if (!response.ok){
        throw new Error("Could not load recipes");
        
    }
    const data = await response.json()
    return (data.meals ?? []).map((item)=> item.strCategory)

    
}
export async function getMealsByCategory(category) {
    const response = await fetch (`${API_URL}/filter.php?c=${encodeURIComponent(category)}`)
    if (!response.ok){
        throw new Error("Could not load recipes");
        
    }
    const data = await response.json()
    return data.meals ?? []
}