import type { Metadata } from "next";
import "./globals.css";
import TabBar from "./components/Navigation/TabBar";

export const metadata: Metadata = {
  title: "Calorie Tracker",
  description: "Calorie Tracker App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <TabBar />
      </body>
    </html>
  );
}
