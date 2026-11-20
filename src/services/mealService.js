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
export async function getCatergories() {
    const response = await fetch (`${API_URL}/list.php?c=list`)
    if (!response.ok){
        throw new Error("Could not load recipes");
        
    }
    const data = await response.json()
    return (data.meals ?? []).map((item)=> item.str.Catergory)

    
}
export async function getMealByCatergory(catergory) {
    const response = await fetch (`${API_URL}/filter.php?c=${encodeURIComponent(catergory)}`)
    if (!response.ok){
        throw new Error("Could not load recipes");
        
    }
    const data = await response.json()
    return data.meal ?? []
}