import type { Metadata } from "next";
import "./globals.css";
import TabBar from "./components/Navigation/TabBar";
import ThemeProvider from "./components/Theme/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="container">{children}</div>
          <TabBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
