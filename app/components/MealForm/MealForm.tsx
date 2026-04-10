import styles from "./styles/MealForm.module.css";
import { useState } from "react";
export default function MealForm() {
  const [meals, setMeals] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const type = formData.get("type");
    const name = formData.get("name");
    const calories = formData.get("calories");
    setMeals([...meals, { type, name, calories }]);
    console.log(meals);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Запись приема пищи и калорий</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <select name="type" className={styles.select}>
          <option value="breakfast">Завтрак</option>
          <option value="lunch">Обед</option>
          <option value="dinner">Ужин</option>
          <option value="snack">Перекус</option>
          <option value="other">Другое</option>
        </select>
        <input
          type="text"
          placeholder="Название блюда"
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Количество калорий"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Добавить
        </button>
      </form>
    </div>
  );
}
