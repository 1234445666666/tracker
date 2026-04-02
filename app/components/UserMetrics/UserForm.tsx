interface IUserFormProps {
  handleSave: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function UserForm({
  handleSave,
  handleSubmit,
}: IUserFormProps): JSX.Element {
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800 transition-colors duration-300"
    >
      <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">
        Цель и параметры
      </h1>

      <div className="space-y-5">
        {/* Пол */}
        <div>
          <h3 className="text-sm font-medium mb-2 text-zinc-500 dark:text-zinc-400">
            Пол
          </h3>
          <select
            name="gender"
            className="w-full h-11 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
          >
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
        </div>

        {/* Цель */}
        <div>
          <h3 className="text-sm font-medium mb-2 text-zinc-500 dark:text-zinc-400">
            Цель
          </h3>
          <select
            name="target"
            className="w-full h-11 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
          >
            <option value="loss">Похудение</option>
            <option value="gain">Набор массы</option>
            <option value="maintain">Поддержание веса</option>
          </select>
        </div>

        {/* Сетка для чисел */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2 text-zinc-500 dark:text-zinc-400">
              Возраст
            </h3>
            <input
              type="number"
              name="age"
              placeholder="25"
              className="w-full h-11 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 text-zinc-500 dark:text-zinc-400">
              Вес
            </h3>
            <input
              type="number"
              name="weight"
              placeholder="70"
              className="w-full h-11 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 text-zinc-500 dark:text-zinc-400">
              Рост
            </h3>
            <input
              type="number"
              name="height"
              placeholder="175"
              className="w-full h-11 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Активность */}
        <div>
          <h3 className="text-sm font-medium mb-2 text-zinc-500 dark:text-zinc-400">
            Активность
          </h3>
          <select
            name="activity"
            className="w-full h-11 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
          >
            <option value="1">Сидячий образ жизни</option>
            <option value="2">Легкая активность</option>
            <option value="3">Средняя активность</option>
            <option value="4">Высокая активность</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-4 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
        >
          Сохранить данные
        </button>
      </div>
    </form>
  );
}
