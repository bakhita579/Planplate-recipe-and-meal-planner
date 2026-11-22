const FAVOURITES_KEY = "planplate_favourites";
const PLANNER_KEY = "planplate_planner";
const LEGACY_PLANNER_KEY = "planplate_weekly_planner";
const FAVOURITES_EVENT = "planplate:favourites-changed";
const PLANNER_EVENT = "planplate:planner-changed";

function readArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function readValue(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

function normalizePlannedMeals(value) {
  if (Array.isArray(value)) {
    return value.filter((item) =>
      item &&
      typeof item.idMeal === "string" &&
      typeof item.strMeal === "string" &&
      typeof item.day === "string" &&
      typeof item.mealType === "string"
    );
  }

  if (!value || typeof value !== "object") return [];

  return Object.entries(value).flatMap(([slot, item]) => {
    const [day, mealType] = slot.split("-");
    const idMeal = item?.idMeal ?? item?.id;
    const strMeal = item?.strMeal ?? item?.name;
    if (
      !idMeal ||
      typeof strMeal !== "string" ||
      !["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].includes(day) ||
      !["Breakfast", "Lunch", "Dinner"].includes(mealType)
    ) {
      return [];
    }

    return [{
      idMeal: String(idMeal),
      strMeal,
      strMealThumb: item.strMealThumb,
      day,
      mealType,
    }];
  });
}

function subscribe(key, eventName, listener) {
  const handleStorage = (event) => {
    if (event.key === key || event.key === null) listener();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener(eventName, listener);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(eventName, listener);
  };
}

export function getFavourites() {
  return readArray(FAVOURITES_KEY).filter((id) => typeof id === "string");
}

export function toggleFavourite(id) {
  const favourites = getFavourites();
  const index = favourites.indexOf(String(id));
  const added = index === -1;

  if (added) {
    favourites.push(String(id));
  } else {
    favourites.splice(index, 1);
  }

  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
  window.dispatchEvent(new Event(FAVOURITES_EVENT));
  return added;
}

export function subscribeToFavourites(listener) {
  return subscribe(FAVOURITES_KEY, FAVOURITES_EVENT, listener);
}

export function getPlannedMeals() {
  const stored = readValue(PLANNER_KEY);
  if (stored !== null) return normalizePlannedMeals(stored);
  return normalizePlannedMeals(readValue(LEGACY_PLANNER_KEY));
}

export function addPlannedMeal(meal, day, mealType) {
  const plannedMeals = getPlannedMeals();
  plannedMeals.push({
    idMeal: String(meal.idMeal),
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    day,
    mealType,
  });
  localStorage.setItem(PLANNER_KEY, JSON.stringify(plannedMeals));
  window.dispatchEvent(new Event(PLANNER_EVENT));
}

export function removePlannedMeal(index) {
  const plannedMeals = getPlannedMeals();
  plannedMeals.splice(index, 1);
  localStorage.setItem(PLANNER_KEY, JSON.stringify(plannedMeals));
  window.dispatchEvent(new Event(PLANNER_EVENT));
}

export function clearPlannedMeals() {
  localStorage.setItem(PLANNER_KEY, JSON.stringify([]));
  window.dispatchEvent(new Event(PLANNER_EVENT));
}

export function subscribeToPlannedMeals(listener) {
  return subscribe(PLANNER_KEY, PLANNER_EVENT, listener);
}