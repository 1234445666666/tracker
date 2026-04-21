"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import styles from "./styles/Scanner.module.css";

export default function Scanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Функция включения камеры
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
      () => {},
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

  // Функция для "сфоткать" (сканирование файла/галереи)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Показываем превью изображения снизу
    const reader = new FileReader();
    reader.onload = (event) => setPreviewImage(event.target?.result as string);
    reader.readAsDataURL(file);

    // Сканируем файл
    const html5QrCode = new Html5Qrcode("reader");
    const result = await html5QrCode.scanFile(file, true);
    setScanResult(result);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Сканер</h2>

        {/* Контейнер для видео */}
        <div
          id="reader"
          className={`${styles.reader} ${isCameraOpen ? styles.readerVisible : styles.readerHidden}`}
        ></div>

        {!isCameraOpen && (
          <div className={styles.buttonGroup}>
            <button onClick={startScanner} className={styles.cameraButton}>
              Включить камеру
            </button>

            <label className={styles.uploadLabel}>
              Загрузить фото/Сфоткать
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className={styles.hiddenInput}
                onChange={handleFileUpload}
              />
            </label>
          </div>
        )}

        {isCameraOpen && (
          <button onClick={stopScanner} className={styles.cancelButton}>
            Отмена
          </button>
        )}
      </div>

      {/* Результат и превью */}
      {scanResult && (
        <div className={styles.resultCard}>
          <p className={styles.resultLabel}>QR-код найден:</p>
          <p className={styles.resultText}>{scanResult}</p>
        </div>
      )}

      {previewImage && (
        <div className={styles.previewCard}>
          <p className={styles.previewLabel}>Последнее фото для теста:</p>
          <img
            src={previewImage}
            alt="Preview"
            className={styles.previewImage}
          />
        </div>
      )}
    </div>
  );
}
