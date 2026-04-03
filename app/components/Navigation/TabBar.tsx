"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ScanLine, Settings } from "lucide-react";
import styles from "./styles/TabBar.module.css";

export default function TabBar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {/* Обзор */}
        <Link
          href="/"
          className={`${styles.tab} ${isActive("/") ? styles.active : ""}`}
        >
          <LayoutDashboard size={24} />
          <span className={styles.label}>Обзор</span>
        </Link>

        {/* Сканер (Центральный элемент) */}
        <div className={styles.centerWrapper}>
          <Link href="/scanner" className={styles.scannerButton}>
            <ScanLine size={28} />
          </Link>
        </div>

        {/* Настройки */}
        <Link
          href="/settings"
          className={`${styles.tab} ${isActive("/settings") ? styles.active : ""}`}
        >
          <Settings size={24} />
          <span className={styles.label}>Настройки</span>
        </Link>
      </div>
    </nav>
  );
}
