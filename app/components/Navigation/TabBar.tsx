"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ScanLine, Settings } from "lucide-react";

export default function TabBar() {
  const pathname = usePathname();

  // Функция для проверки активной ссылки
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 pb-safe shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-6">
        {/* Обзор */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/") ? "text-blue-600 dark:text-blue-500" : "text-zinc-500"
          }`}
        >
          <LayoutDashboard size={24} strokeWidth={isActive("/") ? 2.5 : 2} />
          <span className="text-[10px] font-medium uppercase tracking-wider">
            Обзор
          </span>
        </Link>

        {/* Сканер (Акцентная кнопка по центру) */}
        <Link
          href="/scanner"
          className={`relative -top-4 flex items-center justify-center w-14 h-14 rounded-2xl shadow-lg shadow-blue-500/30 transition-transform active:scale-90 ${
            isActive("/scanner")
              ? "bg-blue-600 text-white"
              : "bg-zinc-900 dark:bg-white text-white dark:text-black"
          }`}
        >
          <ScanLine size={28} />
        </Link>

        {/* Настройки */}
        <Link
          href="/settings"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/settings")
              ? "text-blue-600 dark:text-blue-500"
              : "text-zinc-500"
          }`}
        >
          <Settings size={24} strokeWidth={isActive("/settings") ? 2.5 : 2} />
          <span className="text-[10px] font-medium uppercase tracking-wider">
            Настройки
          </span>
        </Link>
      </div>
    </nav>
  );
}
