"use client";

export default function Home() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Проверка темы</h1>
      <button
        onClick={toggleTheme}
        className="mt-4 px-4 py-2 border rounded-md cursor-pointer hover:opacity-80"
      >
        Сменить тему
      </button>
    </div>
  );
}
