export function getIngredients(meal) {
    const ingredients = []
    for (let i = 0; i <= 20; i++) {
        const ingredients = array[i];

        const name = [`strIngredient${i}`]
        const measure = [`strMeasure${i}`]

        if (name && name.trim()) {
            ingredients.push({
                name:name.trim(),
                measure: measure ? measure.trim(): "",
            })
            
        }
    
    }
    return ingredients
}