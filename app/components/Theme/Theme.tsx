// "use client";
// import styles from "./styles/Theme.module.css";

// export default function Theme() {
//   const toggleTheme = () => {
//     document.documentElement.classList.toggle("dark");
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Выбор темы</h1>
//       <button onClick={toggleTheme} className={styles.button}>
//         Переключить
//       </button>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useThemeStore } from "../Theme/ThemeStore.ts";
import styles from "./styles/Theme.module.css";

export default function Theme() {
  const { theme, toggleTheme } = useThemeStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (!mounted) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Выбор темы</h1>
        <button className={styles.button} style={{ opacity: 0 }}>
          Загрузка...
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Выбор темы</h1>
      <button onClick={toggleTheme} className={styles.button}>
        Переключить (сейчас {theme === "dark" ? "тёмная" : "светлая"})
      </button>
    </div>
  );
}
