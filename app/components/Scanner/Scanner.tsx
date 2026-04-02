"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function Scanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // 1. Функция включения камеры
  const startScanner = async () => {
    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;

    await html5QrCode.start(
      { facingMode: "environment" }, // Задняя камера
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText) => {
        setScanResult(decodedText);
        stopScanner();
      },
      () => {}, // Игнорируем ошибки поиска кода
    );
    setIsCameraOpen(true);
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.stop();
      scannerRef.current = null;
      setIsCameraOpen(false);
    }
  };

  // 2. Функция для "сфоткать" (сканирование файла/галереи)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Показываем превью изображения снизу
    const reader = new FileReader();
    reader.onload = (event) => setPreviewImage(event.target?.result as string);
    reader.readAsDataURL(file);

    // Сканируем файл
    const html5QrCode = new Html5Qrcode("reader");
    try {
      const result = await html5QrCode.scanFile(file, true);
      setScanResult(result);
    } catch (err) {
      alert("QR-код на фото не найден");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col gap-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-lg border dark:border-zinc-800">
        <h2 className="text-xl font-bold mb-4 text-center">Сканер</h2>

        {/* Контейнер для видео */}
        <div
          id="reader"
          className={`overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 ${isCameraOpen ? "block" : "hidden"}`}
        ></div>

        {!isCameraOpen && (
          <div className="flex flex-col gap-3">
            <button
              onClick={startScanner}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              Включить камеру
            </button>

            <label className="w-full py-4 bg-zinc-200 dark:bg-zinc-800 text-center rounded-xl font-bold cursor-pointer active:scale-95 transition-transform">
              Загрузить фото/Сфоткать
              <input
                type="file"
                accept="image/*"
                capture="environment" // Сразу открывает камеру для фото на телефоне
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        )}

        {isCameraOpen && (
          <button
            onClick={stopScanner}
            className="w-full mt-4 py-2 bg-red-500/10 text-red-500 rounded-lg"
          >
            Отмена
          </button>
        )}
      </div>

      {/* Результат и превью */}
      {scanResult && (
        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
          <p className="text-green-600 font-bold text-sm">QR-код найден:</p>
          <p className="break-all dark:text-green-400">{scanResult}</p>
        </div>
      )}

      {previewImage && (
        <div className="bg-white dark:bg-zinc-900 p-2 rounded-xl border dark:border-zinc-800">
          <p className="text-xs text-zinc-500 mb-2">
            Последнее фото для теста:
          </p>
          <img
            src={previewImage}
            alt="Preview"
            className="rounded-lg w-full h-auto object-cover max-h-[300px]"
          />
        </div>
      )}
    </div>
  );
}
