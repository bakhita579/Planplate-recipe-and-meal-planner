import { useEffect, useState } from "react";
import {
  clearPlannedMeals,
  getPlannedMeals,
  removePlannedMeal,
  subscribeToPlannedMeals,
} from "../services/mealPlanStorage";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const mealTypes = ["Breakfast", "Lunch", "Dinner"];

function Planner() {
  const [plannedMeals, setPlannedMeals] = useState(getPlannedMeals);

  useEffect(() => {
    return subscribeToPlannedMeals(() => setPlannedMeals(getPlannedMeals()));
  }, []);

  return (
    <main className="planner-page">
      <header className="page-heading">
        <h1>Weekly planner</h1>
        <p>Plan your breakfasts, lunches, and dinners for the week.</p>
      </header>

      <section className="planner-grid" aria-label="Weekly meal plan">
        {days.map((day) => (
          <article className="day-column" key={day}>
            <h2>{day}</h2>
            {mealTypes.map((mealType) => {
              const meals = plannedMeals
                .map((meal, index) => ({ ...meal, index }))
                .filter(
                  (meal) => meal.day === day && meal.mealType === mealType
                );

              return (
                <section className="meal-slot" key={mealType}>
                  <h3 className="slot-label">{mealType}</h3>
                  {meals.length === 0 ? (
                    <p className="empty-slot">Nothing planned</p>
                  ) : (
                    meals.map((meal) => (
                      <div
                        className="planned-item"
                        key={`${meal.idMeal}-${meal.index}`}
                      >
                        {meal.strMealThumb && (
                          <img src={meal.strMealThumb} alt="" loading="lazy" />
                        )}
                        <span>{meal.strMeal}</span>
                        <button
                          type="button"
                          aria-label={`Remove ${meal.strMeal} from ${day} ${mealType}`}
                          onClick={() => removePlannedMeal(meal.index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </section>
              );
            })}
          </article>
        ))}
      </section>

      <button
        type="button"
        className="secondary-btn"
        disabled={plannedMeals.length === 0}
        onClick={clearPlannedMeals}
      >
        Clear week
      </button>
    </main>
  );
}

export default Planner;