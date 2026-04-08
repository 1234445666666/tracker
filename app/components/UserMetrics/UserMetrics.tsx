"use client";
import React, { useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import UserForm from "./components/UserForm";
// import "react-toastify/dist/ReactToastify.css";

export default function UserMetrics() {
  const [calories, setCalories] = React.useState(0);
  const [macros, setMacros] = React.useState({ protein: 0, fat: 0, carbs: 0 });
  const [open, setOpen] = React.useState(false);

  const calculateMetrics = (
    activity: string,
    age: string,
    gender: string,
    height: string,
    weight: string,
    target: string,
  ) => {
    const weightNum = Number(weight);
    const heightNum = Number(height);
    const ageNum = Number(age);
    let activityNum = 1.2;
    let targetNum = 1;

    switch (activity) {
      case "1":
        activityNum = 1.2;
        break;
      case "2":
        activityNum = 1.375;
        break;
      case "3":
        activityNum = 1.55;
        break;
      case "4":
        activityNum = 1.725;
        break;
    }

    switch (target) {
      case "loss":
        targetNum = 0.85;
        break;
      case "maintain":
        targetNum = 1;
        break;
      case "gain":
        targetNum = 1.15;
        break;
    }

    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    const totalCalories = Math.round(bmr * activityNum * targetNum);
    setCalories(totalCalories);

    setMacros({
      protein: Math.round((totalCalories * 0.3) / 4),
      fat: Math.round((totalCalories * 0.3) / 9),
      carbs: Math.round((totalCalories * 0.4) / 4),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (!data.age || !data.height || !data.weight) {
      toast.error("Пожалуйста, заполните все поля!", {
        position: "top-center",
        pauseOnHover: false,
        autoClose: 4000,
        theme: "colored",
      });
      return;
    }

    calculateMetrics(
      data.activity as string,
      data.age as string,
      data.gender as string,
      data.height as string,
      data.weight as string,
      data.target as string,
    );

    handleSave();
    setOpen(true);
  };

  const handleSave = () => {
    toast.success("Данные успешно рассчитаны и сохранены!", {
      position: "top-right",
      pauseOnHover: false,
      autoClose: 3000,
      theme: "colored",
    });
  };

  return (
    <div
      style={{
        maxWidth: "448px",
        margin: "0 auto",
        padding: "20px",
        marginBottom: "100px",
      }}
    >
      <UserForm handleSubmit={handleSubmit} />

      {open && (
        <div
          style={{
            marginTop: "30px",
            padding: "25px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            border: "1px solid #eaeaea",
            animation: "fadeIn 0.5s ease-in-out",
            textAlign: "center",
          }}
        >
          <h2 style={{ margin: "0 0 10px 0", color: "#333", fontSize: "24px" }}>
            Ваша суточная норма
          </h2>
          <p style={{ color: "#666", fontSize: "14px", marginBottom: "20px" }}>
            Для достижения вашей цели
          </p>

          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#4CAF50",
              marginBottom: "25px",
            }}
          >
            {calories}{" "}
            <span style={{ fontSize: "20px", color: "#888" }}>ккал</span>
          </div>

          {/* Плашки с БЖУ */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <MacroCard title="Белки" value={macros.protein} color="#FF9800" />
            <MacroCard title="Жиры" value={macros.fat} color="#E91E63" />
            <MacroCard title="Углеводы" value={macros.carbs} color="#2196F3" />
          </div>

          <button
            onClick={() => setOpen(false)}
            style={{
              marginTop: "25px",
              padding: "8px 16px",
              border: "none",
              backgroundColor: "#f5f5f5",
              color: "#555",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Скрыть результаты
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <ToastContainer />
    </div>
  );
}

const MacroCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => (
  <div
    style={{
      flex: 1,
      padding: "15px 10px",
      backgroundColor: `${color}15`,
      borderTop: `4px solid ${color}`,
      borderRadius: "8px",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}>
      {title}
    </div>
    <div style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>
      {value} г
    </div>
  </div>
);
