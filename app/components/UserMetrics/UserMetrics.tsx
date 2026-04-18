import * as React from "react";
import { useForm } from "@tanstack/react-form";
import FieldInfo from "./components/FieldInfo";
import styles from "./styles/UserForm.module.css";

export default function UserMetrics() {
  const form = useForm({
    defaultValues: {
      gender: "",
      target: "",
      age: "",
      height: "",
      weight: "",
      activity: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  return (
    <div>
      <h1 className={styles.title}>Цель и параметры</h1>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className={styles.formContent}>
          {/* A type-safe field component*/}
          <form.Field
            name="gender"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "A first name is required"
                  : value.length < 3
                    ? "First name must be at least 3 characters"
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") && 'No "error" allowed in first name'
                );
              },
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <div className={styles.fieldGroup}>
                  <h3 className={styles.label}>Пол</h3>
                  <select name="gender" className={styles.select}>
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                  </select>
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />
        </div>
        <div>
          <form.Field
            name="target"
            children={(field) => (
              <div className={styles.fieldGroup}>
                <h3 className={styles.label}>Цель</h3>
                <select name="target" className={styles.select}>
                  <option value="loss">Похудение</option>
                  <option value="gain">Набор массы</option>
                  <option value="maintain">Поддержание веса</option>
                </select>
                <FieldInfo field={field} />
              </div>
            )}
          />
        </div>
        <div>
          <form.Field
            name="age"
            children={(field) => (
              <>
                <h3 className={styles.label}>Возраст</h3>

                <input
                  className={styles.input}
                  inputMode="numeric"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="height"
            children={(field) => (
              <>
                <h3 className={styles.label}>Рост</h3>

                <input
                  className={styles.input}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        <div>
          <form.Field
            name="weight"
            children={(field) => (
              <>
                <h3 className={styles.label}>Вес</h3>
                <input
                  className={styles.input}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="activity"
            children={(field) => (
              <>
                <h3 className={styles.label}>Активность</h3>
                <select name="activity" className={styles.select}>
                  <option value="1">Сидячий образ жизни</option>
                  <option value="2">Легкая активность</option>
                  <option value="3">Средняя активность</option>
                  <option value="4">Высокая активность</option>
                </select>
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <>
              <button
                type="submit"
                disabled={!canSubmit}
                className={styles.button}
              >
                {isSubmitting ? "..." : "Submit"}
              </button>
              <button
                type="reset"
                onClick={(e) => {
                  // Avoid unexpected resets of form elements (especially <select> elements)
                  e.preventDefault();
                  form.reset();
                }}
              >
                Reset
              </button>
            </>
          )}
        />
      </form>
    </div>
  );
}
