"use client";
import styles from "./styles/Theme.module.css";

export default function Theme() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Выбор темы</h1>
      <button onClick={toggleTheme} className={styles.button}>
        Переключить
      </button>
    </div>
  );
}
