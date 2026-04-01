"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function Scanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    // Конфигурация сканера
    const scanner = new Html5QrcodeScanner(
      "reader", // id элемента, куда отрисуется камера
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
        aspectRatio: 1.0,
      },
      /* verbose= */ false,
    );

    scanner.render(
      (result) => {
        setScanResult(result);
        scanner.clear(); // Остановить камеру после успешного сканирования
      },
      (error) => {
        // Ошибки сканирования (игнорируем, пока ищем код)
      },
    );

    // Очистка при размонтировании компонента
    return () => {
      scanner.clear().catch((err) => console.error("Ошибка остановки:", err));
    };
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-xl font-bold mb-4 text-center">
        Сканировать продукт
      </h2>

      {/* Место для вывода камеры */}
      <div id="reader" className="overflow-hidden rounded-xl"></div>

      {scanResult && (
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg break-all">
          Результат: {scanResult}
        </div>
      )}
    </div>
  );
}
