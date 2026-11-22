import { useCallback, useEffect, useRef, useState } from "react";
import RecipeCard from "../components/Recipes/RecipesCard";
import PlannerDialog from "../components/Recipes/plannerDialog";
import {
  getCategories,
  getMealsByCategory,
  searchMeals,
} from "../services/mealService";
import { addPlannedMeal } from "../services/mealPlanStorage";

function Discover() {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Chicken");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const requestId = useRef(0);

  const loadMeals = useCallback(async (load) => {
    const currentRequest = ++requestId.current;

    try {
      const results = await load();
      if (currentRequest === requestId.current) {
        setMeals(results);
      }
    } catch (loadError) {
      console.error("Could not load recipes", loadError);
      if (currentRequest === requestId.current) {
        setMeals([]);
        setError("Something went wrong. Please try again.");
      }
    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false);
      }
    }

  }, []);

  useEffect(() => {
    let active = true;
    const initialRequest = ++requestId.current;
    getCategories()
      .then((results) => {
        if (active) setCategories(results);
      })
      .catch((loadError) => {
        console.error("Could not load recipe categories", loadError);
        if (active) setCategoryError("Could not load categories.");
      });

    async function loadInitialMeals() {
      try {
        const results = await getMealsByCategory("Chicken");
        if (active && initialRequest === requestId.current) setMeals(results);
      } catch (loadError) {
        console.error("Could not load recipes", loadError);
        if (active && initialRequest === requestId.current) {
          setMeals([]);
          setError("Something went wrong. Please try again.");
        }
      } finally {
        if (active && initialRequest === requestId.current) setLoading(false);
      }
    }

    loadInitialMeals();
    return () => {
      active = false;
      requestId.current += 1;
    };
  }, []);

  function handleCategoryClick(category) {
    setSelectedCategory(category);
    setQuery("");
    setLoading(true);
    setError("");
    if (category === "All") {
      loadMeals(() => searchMeals(""));
    } else {
      loadMeals(() => getMealsByCategory(category));
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    setSelectedCategory("");
    setLoading(true);
    setError("");
    loadMeals(() => searchMeals(query.trim()));
  }

  return (
    <main className="discover-page">
      <section className="discover-hero">
        <h1>Discover recipes</h1>
        <p>Discover new recipes and plan your week</p>

        <form className="search-bar" role="search" onSubmit={handleSearch}>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search recipes (e.g. chicken, pasta)..."
            aria-label="Search recipes"
          />
          <button type="submit">Search</button>
        </form>

        <div className="chips" aria-label="Filter by category">
          {["All", ...categories].map((category) => (
            <button
              type="button"
              key={category}
              className={`chip${selectedCategory === category ? " active" : ""}`}
              aria-pressed={selectedCategory === category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {categoryError && <p className="page-status" role="status">{categoryError}</p>}
      {loading && <p className="page-status" role="status">Loading recipes...</p>}
      {error && <p className="page-status" role="alert">{error}</p>}
      {!loading && !error && meals.length === 0 && (
        <p className="page-status" role="status">
          No recipes found. Try a different search.
        </p>
      )}
      {!loading && !error && meals.length > 0 && (
        <section className="recipe-grid" aria-label="Recipes">
          {meals.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              meal={meal}
              fallbackCategory={selectedCategory}
              onAddToPlanner={setSelectedMeal}
            />
          ))}
        </section>
      )}

      {selectedMeal && (
        <PlannerDialog
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
          onConfirm={(day, mealType) =>
            addPlannedMeal(selectedMeal, day, mealType)
          }
        />
      )}
    </main>
  );
}

export default Discover;