import React from "react";
import styles from "./styles/MealForm.module.css";

interface MealFieldsProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function MealField({ onSubmit }: MealFieldsProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
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
  );
}
