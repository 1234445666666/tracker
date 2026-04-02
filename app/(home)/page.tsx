"use client";

import Theme from "../components/Theme/Theme";
import UserMetrics from "../components/UserMetrics/UserMetrics";

export default function Home() {
  return (
    <main className="min-h-screen p-4 flex flex-col gap-6">
      {/* не работает на телефоне надо фиксить */}
      {/* <Theme /> */}
      <UserMetrics />
    </main>
  );
}
