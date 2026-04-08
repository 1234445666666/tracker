import type { Metadata } from "next";
import "./globals.css";
import TabBar from "./components/Navigation/TabBar";

export const metadata: Metadata = {
  title: "Calorie Tracker",
  description: "Calorie Tracker App",
};

const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme-state');
      if (stored) {
        var parsed = JSON.parse(stored);
        if (parsed.state && parsed.state.theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>
        {children}
        <TabBar />
      </body>
    </html>
  );
}
