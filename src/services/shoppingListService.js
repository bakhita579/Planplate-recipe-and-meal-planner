import { getMealById } from "./mealService";

export async function buildShoppingList(plannedMeals) {
  const ids = [...new Set(plannedMeals.map((meal) => meal.idMeal))];
  if (!ids.length) return [];

  const meals = await Promise.all(ids.map((id) => getMealById(id)));
  const ingredients = new Map();

 for (const response of meals) {
  const meal = Array.isArray(response) ? response[0] : response;
  if (!meal) continue;

    for (let index = 1; index <= 20; index += 1) {
      const name = (meal[`strIngredient${index}`] || "").trim().toLowerCase();
      const measure = (meal[`strMeasure${index}`] || "").trim();
      if (!name) continue;

      if (!ingredients.has(name)) ingredients.set(name, []);
      if (measure) ingredients.get(name).push(measure);
    }
  }

  return [...ingredients.entries()]
    .map(([name, measures]) => ({ name, measures: measures.join(" + ") }))
    .sort((left, right) => left.name.localeCompare(right.name));
}