"use client";
export default function Theme() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="p-4 flex flex-col items-center border-b dark:border-zinc-800">
      <h1 className="text-xl font-bold">Выбор темы</h1>
      <button
        onClick={toggleTheme}
        className="mt-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        Переключить
      </button>
    </div>
  );
}
