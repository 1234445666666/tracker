import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import UserForm from "./UserForm";

export default function UserMetrics() {
  const showToast = (message: string, isError: boolean = false) => {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      className: "custom-toast",
      style: {
        background: isError
          ? "linear-gradient(to right, #dc2626, #ef4444)"
          : "linear-gradient(to right, #2563eb, #3b82f6)",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: "500",
        boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
      },
    }).showToast();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    if (!data.age || !data.height || !data.weight) {
      showToast("Заполните все поля!", true);
      return;
    }
    handleSave();
  };

  const handleSave = () => {
    showToast("Данные сохранены!", false);
  };

  return <UserForm handleSave={handleSave} handleSubmit={handleSubmit} />;
}
