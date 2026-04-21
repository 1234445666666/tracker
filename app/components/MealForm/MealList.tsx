import React from "react";
import styles from "./styles/MealForm.module.css";
import { IMeal } from "./types";

interface MealsListProps {
  meals: IMeal[];
  open: boolean;
  onClose: () => void;
  onDelete: (index: number) => void;
  onClearAll: () => void;
}

export default function MealsList({
  meals,
  open,
  onClose,
  onDelete,
  onClearAll,
}: MealsListProps) {
  if (!open || meals.length === 0) return null;

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className={styles.records}>
      <h2 className={styles.subtitle}>Все записи ({meals.length}):</h2>

      {meals.map((meal, i) => (
        <div key={i} className={styles.mealItem}>
          <div className={styles.mealInfo}>
            <strong>{meal.name}</strong> — {meal.calories} ккал
            <span className={styles.mealType}>
              {getMealTypeLabel(meal.type)}
            </span>
          </div>
          <button
            onClick={() => onDelete(i)}
            className={styles.deleteButton}
            title="Удалить"
          >
            ✕
          </button>
        </div>
      ))}

      <div className={styles.totalCalories}>
        Всего: <strong>{totalCalories}</strong> ккал
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={onClose} className={styles.hideButton}>
          Скрыть
        </button>
        <button onClick={onClearAll} className={styles.clearButton}>
          Очистить всё
        </button>
      </div>
    </div>
  );
}

function getMealTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    breakfast: "Завтрак",
    lunch: "Обед",
    dinner: "Ужин",
    snack: "Перекус",
    other: "Другое",
  };
  return labels[type] || type;
}
