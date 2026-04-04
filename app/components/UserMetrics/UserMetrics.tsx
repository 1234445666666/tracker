"use client";
import React from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import UserForm from "./components/UserForm";

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

  const [bmi, setBmi] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const calculateBMI = (
    activity: any,
    age: string,
    gender: string,
    height: string,
    weight: string,
    target: string,
  ) => {
    const weightNum = Number(weight);
    const heightNum = Number(height);
    const ageNum = Number(age);
    let activityNum = 0;
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
      default:
        activityNum = 1.2;
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
      default:
        targetNum = 1;
    }
    if (gender === "male") {
      const manBMI = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
      console.log(Math.round(manBMI * activityNum * targetNum));
      console.log(
        `белки ${(manBMI * activityNum * targetNum * 0.3) / 4}, жиры ${(manBMI * activityNum * targetNum * 0.3) / 9}, углеводы ${(manBMI * activityNum * targetNum * 0.4) / 4}`,
      );
      setBmi(Math.round(manBMI * activityNum * targetNum));
    } else {
      const womanBMI = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
      console.log(Math.round(womanBMI * activityNum * targetNum));
      console.log(
        `белки ${(womanBMI * activityNum * targetNum * 0.3) / 4}, жиры ${(womanBMI * activityNum * targetNum * 0.3) / 9}, углеводы ${(womanBMI * activityNum * targetNum * 0.4) / 4}`,
      );
      setBmi(Math.round(womanBMI * activityNum * targetNum));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (!data.age || !data.height || !data.weight) {
      showToast("Заполните все поля!", true);
      return;
    }
    calculateBMI(
      data.activity,
      data.age,
      data.gender,
      data.height,
      data.weight,
      data.target,
    );

    console.log(data);
    handleSave();
    setOpen(true);
  };

  const handleSave = () => {
    showToast("Данные сохранены!", false);
  };

  return (
    <div>
      <UserForm handleSubmit={handleSubmit} />
      {open && (
        <div>
          <h1>Ваш BMI: {bmi}</h1>
        </div>
      )}
    </div>
  );
}
