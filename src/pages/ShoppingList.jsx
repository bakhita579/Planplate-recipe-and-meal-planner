import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  getPlannedMeals,
  subscribeToPlannedMeals,
} from "../services/mealPlanStorage";
import { buildShoppingList } from "../services/shoppingListService";

const CHECKED_KEY = "planplate_checked";

function getCheckedItems() {
  try {
    const value = JSON.parse(localStorage.getItem(CHECKED_KEY) || "[]");
    return Array.isArray(value)
      ? value.filter((name) => typeof name === "string")
      : [];
  } catch {
    return [];
  }
}

function ShoppingList() {
  const [plannedMeals, setPlannedMeals] = useState(getPlannedMeals);
  const [checkedItems, setCheckedItems] = useState(getCheckedItems);
  const [result, setResult] = useState({ key: "", items: [], error: "" });
  const [saveError, setSaveError] = useState("");
  const mealIdsKey = [...new Set(plannedMeals.map((meal) => meal.idMeal))].join(",");

  useEffect(() => {
    return subscribeToPlannedMeals(() => setPlannedMeals(getPlannedMeals()));
  }, []);

  useEffect(() => {
    let active = true;
    if (!mealIdsKey) return () => {
      active = false;
    };

    async function loadItems() {
      try {
        const items = await buildShoppingList(plannedMeals);
        if (active) setResult({ key: mealIdsKey, items, error: "" });
      } catch (error) {
        console.error("Could not build shopping list", error);
        if (active) {
          setResult({
            key: mealIdsKey,
            items: [],
            error: "Could not build your shopping list. Please try again.",
          });
        }
      }
    }

    loadItems();
    return () => {
      active = false;
    };
  }, [mealIdsKey]);

  function handleCheckedChange(name, checked) {
    const updated = checked
      ? [...new Set([...checkedItems, name])]
      : checkedItems.filter((item) => item !== name);

    try {
      localStorage.setItem(CHECKED_KEY, JSON.stringify(updated));
      setCheckedItems(updated);
      setSaveError("");
    } catch (error) {
      console.error("Could not save shopping list progress", error);
      setSaveError("Could not save your checked items.");
    }
  }

  const isLoading = mealIdsKey && result.key !== mealIdsKey;
  const items = result.key === mealIdsKey ? result.items : [];
  const error = result.key === mealIdsKey ? result.error : "";

  return (
    <main className="content-page shopping-page">
      <header className="page-heading">
        <h1>Shopping list</h1>
        <p>Ingredients from the recipes in your weekly planner.</p>
      </header>

      {!mealIdsKey && (
        <p className="page-status" role="status">
          Your planner is empty. <Link to="/Planner">Add some recipes first.</Link>
        </p>
      )}
      {isLoading && <p className="page-status" role="status">Building your list...</p>}
      {error && <p className="page-status" role="alert">{error}</p>}
      {!isLoading && !error && mealIdsKey && items.length === 0 && (
        <p className="page-status" role="status">No ingredients were found for these recipes.</p>
      )}

      {items.length > 0 && (
        <>
          <ul className="shopping-list">
            {items.map(({ name, measures }) => {
              const isChecked = checkedItems.includes(name);
              return (
                <li key={name}>
                  <label>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(event) =>
                        handleCheckedChange(name, event.target.checked)
                      }
                    />
                    <span className={isChecked ? "done" : ""}>
                      {name}
                      {measures && <small>{measures}</small>}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
          {saveError && <p className="page-status" role="alert">{saveError}</p>}
          <button
            type="button"
            className="secondary-btn print-list-btn"
            onClick={() => window.print()}
          >
            Print list
          </button>
        </>
      )}
    </main>
  );
}

export default ShoppingList;