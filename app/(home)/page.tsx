"use client";

import MealForm from "../components/MealForm/MealForm";
import UserMetrics from "../components/UserMetrics/UserMetrics";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <UserMetrics />
      <MealForm />
    </main>
  );
}
