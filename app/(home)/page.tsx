"use client";

import MealForm from "../components/MealForm/MealForm";
import UserMetrics from "../components/UserMetrics/UserMetrics";

export default function Home() {
  return (
    <main style={{ height: "100vh", overflow: "auto" }}>
      <UserMetrics />
      <MealForm />
    </main>
  );
}
