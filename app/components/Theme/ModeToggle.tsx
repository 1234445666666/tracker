import { Moon, Sun } from "lucide-react";

import { useTheme } from "./ThemeProvider";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-4">
      <button onClick={() => setTheme("light")}>
        <Sun size={24} color={theme === "light" ? "#f59e0b" : "#64748b"} />
      </button>

      <button onClick={() => setTheme("dark")}>
        <Moon size={24} color={theme === "dark" ? "#818cf8" : "#64748b"} />
      </button>
    </div>
  );
}
