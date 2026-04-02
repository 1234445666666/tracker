import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import UserForm from "./UserForm";

export default function UserMetrics() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  const handleSave = () => {
    Toastify({
      text: `Данные сохранены!`,
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #2563eb, #3b82f6)",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: "500",
        boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
      },
    }).showToast();
  };
  return <UserForm handleSave={handleSave} handleSubmit={handleSubmit} />;
}
