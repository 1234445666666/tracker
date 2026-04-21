"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import styles from "./styles/MealForm.module.css";
import { IMeal } from "./types";
import MealField from "./MealField";
import MealsList from "./MealList";

const STORAGE_KEY = "meals";

function loadMeals(): IMeal[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveMeals(meals: IMeal[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meals));
  } catch (error) {
    console.error("Ошибка сохранения в localStorage:", error);
  }
}

export default function MealForm() {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = loadMeals();
    if (saved.length > 0) {
      setMeals(saved);
      setOpen(true);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveMeals(meals);
    }
  }, [meals, isLoaded]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
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

    setMeals((prev) => [...prev, newMeal]);
    setOpen(true);

    toast.success("Блюдо добавлено!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });

    event.currentTarget.reset();
  };

  const handleDelete = (index: number) => {
    setMeals((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length === 0) setOpen(false);
      return updated;
    });

    toast.info("Запись удалена", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  const handleClearAll = () => {
    setMeals([]);
    setOpen(false);
    localStorage.removeItem(STORAGE_KEY);

    toast.info("Все записи удалены", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Запись приема пищи и калорий</h1>

      <MealField onSubmit={handleSubmit} />

      {!open && meals.length > 0 && (
        <button onClick={() => setOpen(true)} className={styles.showButton}>
          Показать записи ({meals.length})
        </button>
      )}

      <MealsList
        meals={meals}
        open={open}
        onClose={() => setOpen(false)}
        onDelete={handleDelete}
        onClearAll={handleClearAll}
      />

      <ToastContainer />
    </div>
  );
}
