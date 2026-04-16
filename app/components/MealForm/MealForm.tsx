import styles from "./styles/MealForm.module.css";
import { useState, FormEvent } from "react";
export default function MealForm() {
  interface Meal {
    type: string;
    name: string;
    calories: string;
  }

  const [meals, setMeals] = useState<Meal[]>([]);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const type = formData.get("type") as string;
    const name = formData.get("name") as string;
    const calories = formData.get("calories") as string;

    const newMeal: Meal = { type, name, calories };
    const addedMeals = [...meals, newMeal];
    setMeals(addedMeals);
    console.log("Новое блюдо:", newMeal);
    console.log("Добавленные блюда:", addedMeals);
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
          name="name"
          type="text"
          placeholder="Название блюда"
          className={styles.input}
        />
        <input
          name="calories"
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
