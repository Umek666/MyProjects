import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./itemList";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "3d9b467bc49f402e8e4afa5698be1ec3";
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);
  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>

        <img className={styles.recipeImage} src={food.image} alt="" />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⌚ {food.readyInMinutes} minutes</strong>
          </span>
          <span>
            <strong>👩‍👧‍👦Portions: {food.servings}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🌿Vegetarian" : "🍖Non-Vegetarian"}
            </strong>
          </span>
          <span>
            <strong>{food.vegan ? "🐮Vegan" : ""}</strong>
          </span>
        </div>
        {/* <div>
           <span>{food.summary}</span>
          </div> */}
        <h2 className={styles.instructions}>Ingredients</h2>
        <ItemList food={food} isLoading={isLoading} />
        <h2 className={styles.instructions}>Intructions:</h2>

        <div className={styles.recipeInstructions}>
          <ol>
            {isLoading ? (
              <p>Writing Instructions...</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
