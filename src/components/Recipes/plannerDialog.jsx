import { useEffect, useRef, useState } from "react";

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

function PlannerDialog({ meal, onClose, onConfirm }) {
  const dialogRef = useRef(null);
  const [day, setDay] = useState("Monday");
  const [mealType, setMealType] = useState("Breakfast");
  const [error, setError] = useState("");

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    try {
      onConfirm(day, mealType);
      onClose();
    } catch {
      setError("Could not add this recipe to your planner. Please try again.");
    }
  }

  return (
    <dialog
      className="planner-dialog"
      ref={dialogRef}
      aria-labelledby="plan-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2 id="plan-dialog-title">Add {meal.strMeal} to planner</h2>
        <label>
          Day
          <select value={day} onChange={(event) => setDay(event.target.value)}>
            {days.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Meal
          <select
            value={mealType}
            onChange={(event) => setMealType(event.target.value)}
          >
            {mealTypes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        {error && <p className="planner-dialog-error" role="alert">{error}</p>}
        <div className="dialog-actions">
          <button type="button" className="secondary-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="primary-btn">
            Add
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default PlannerDialog;