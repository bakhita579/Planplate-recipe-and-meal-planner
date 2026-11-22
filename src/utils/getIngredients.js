export function getIngredients(meal) {
  if (!meal) return [];

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (typeof name === "string" && name.trim()) {
      ingredients.push({
        name: name.trim(),
        measure: typeof measure === "string" ? measure.trim() : "",
      });
    }
  }
  return ingredients;
}