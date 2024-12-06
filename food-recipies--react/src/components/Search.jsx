import { useEffect, useState } from "react";
import styles from "./search.module.css";
import { api_key } from "../../config";

const URL = "https://api.spoonacular.com/recipes/complexSearch";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza");
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?query=${query}&apiKey=${api_key}`);
      const data = await res.json();
      console.log(data);
      setFoodData(data.results);
    }
    fetchFood();
  }, [query]);
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
      />
    </div>
  );
}
