"use client";

import TabBar from "../components/Navigation/TabBar";
import Scanner from "../components/Scanner/Scanner";
import Theme from "../components/Theme/Theme";
import UserMetrics from "../components/UserMetrics/UserMetrics";

export default function Home() {
  return (
    <main className="min-h-screen p-4 flex flex-col gap-6">
      {/* не работает на телефоне надо фиксить */}
      {/* <Theme /> */}
      <UserMetrics />
      <Scanner />
      <TabBar />
    </main>
  );
}
