import styles from "../styles/UserForm.module.css";

interface IUserFormProps {
  handleSubmit: (e: React.FormEvent) => void;
}

export default function UserForm({ handleSubmit }: IUserFormProps) {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Цель и параметры</h1>

      <div className={styles.formContent}>
        {/* Пол */}
        <div className={styles.fieldGroup}>
          <h3 className={styles.label}>Пол</h3>
          <select name="gender" className={styles.select}>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
        </div>

        {/* Цель */}
        <div className={styles.fieldGroup}>
          <h3 className={styles.label}>Цель</h3>
          <select name="target" className={styles.select}>
            <option value="loss">Похудение</option>
            <option value="gain">Набор массы</option>
            <option value="maintain">Поддержание веса</option>
          </select>
        </div>

        {/* Сетка для чисел */}
        <div className={styles.grid}>
          <div className={styles.fieldGroup}>
            <h3 className={styles.label}>Возраст</h3>
            <input
              type="number"
              name="age"
              placeholder="25"
              className={styles.input}
            />
          </div>
          <div className={styles.fieldGroup}>
            <h3 className={styles.label}>Вес</h3>
            <input
              type="number"
              name="weight"
              placeholder="70"
              className={styles.input}
            />
          </div>
          <div className={styles.fieldGroup}>
            <h3 className={styles.label}>Рост</h3>
            <input
              type="number"
              name="height"
              placeholder="175"
              className={styles.input}
            />
          </div>
        </div>

        {/* Активность */}
        <div className={styles.fieldGroup}>
          <h3 className={styles.label}>Активность</h3>
          <select name="activity" className={styles.select}>
            <option value="1">Сидячий образ жизни</option>
            <option value="2">Легкая активность</option>
            <option value="3">Средняя активность</option>
            <option value="4">Высокая активность</option>
          </select>
        </div>

        <button type="submit" className={styles.button}>
          Сохранить данные
        </button>
      </div>
    </form>
  );
}
