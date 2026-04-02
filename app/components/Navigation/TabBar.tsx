"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ScanLine, Settings } from "lucide-react";

export default function TabBar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 pb-[env(safe-area-inset-bottom)]">
      {/* 
        Используем grid или flex-1 для равных долей, 
        чтобы центральная кнопка была математически в центре 
      */}
      <div className="flex items-center h-16 w-full max-w-md mx-auto">
        {/* Обзор */}
        <Link
          href="/"
          className={`flex-1 flex flex-col items-center justify-center gap-1 ${
            isActive("/") ? "text-blue-600" : "text-zinc-500"
          }`}
        >
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-medium">Обзор</span>
        </Link>

        {/* Сканер (Центральный элемент) */}
        <div className="flex-1 flex justify-center">
          <Link
            href="/scanner"
            className="relative -top-4 flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black shadow-lg shadow-blue-500/20 active:scale-90 transition-transform"
          >
            <ScanLine size={28} />
          </Link>
        </div>

        {/* Настройки */}
        <Link
          href="/settings"
          className={`flex-1 flex flex-col items-center justify-center gap-1 ${
            isActive("/settings") ? "text-blue-600" : "text-zinc-500"
          }`}
        >
          <Settings size={24} />
          <span className="text-[10px] font-medium">Настройки</span>
        </Link>
      </div>
    </nav>
  );
}
