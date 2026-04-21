"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styles from "./styles/MealForm.module.css";

interface IMeal {
  calories: number;
  name: string;
  type: string;
}

export default function MealForm() {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [open, setOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (!data.name || !data.calories) {
      toast.error("Пожалуйста, заполните название и калории!", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
      });
      return;
    }

    const newMeal: IMeal = {
      name: data.name as string,
      calories: Number(data.calories),
      type: data.type as string,
    };

    setMeals([...meals, newMeal]);
    setOpen(true);

    toast.success("Блюдо добавлено!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });

    (event.target as HTMLFormElement).reset();
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
      {open && meals.length > 0 && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>
            Последние записи:
          </h2>
          {meals.slice(-3).map((meal, i) => (
            <div
              key={i}
              style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}
            >
              <strong>{meal.name}</strong> — {meal.calories} ккал
            </div>
          ))}
          <button
            onClick={() => setOpen(false)}
            style={{ marginTop: "15px", cursor: "pointer" }}
          >
            Скрыть
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
