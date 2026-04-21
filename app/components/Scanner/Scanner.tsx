"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import styles from "./styles/Scanner.module.css";

// Интерфейс для данных о продукте
interface IProduct {
  name: string;
  image: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

export default function Scanner() {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Функция запроса к OpenFoodFacts
  const fetchProductData = async (barcode: string) => {
    setLoading(true);
    setProduct(null);
    try {
      const res = await fetch(`https://openfoodfacts.org{barcode}.json`);
      const data = await res.json();

      if (data.status === 1) {
        const p = data.product;
        setProduct({
          name: p.product_name || "Неизвестный товар",
          image: p.image_front_small_url || "",
          calories: p.nutriments["energy-kcal_100g"] || 0,
          proteins: p.nutriments.proteins_100g || 0,
          fats: p.nutriments.fat_100g || 0,
          carbs: p.nutriments.carbohydrates_100g || 0,
        });
      } else {
        alert("Товар не найден в базе OpenFoodFacts");
      }
    } catch (error) {
      console.error("Ошибка API:", error);
    } finally {
      setLoading(false);
    }
  };

  const startScanner = async () => {
    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;
    setIsCameraOpen(true);

    try {
      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          fetchProductData(decodedText); // Ищем товар
          stopScanner();
        },
        () => {},
      );
    } catch (err) {
      console.error(err);
      setIsCameraOpen(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.stop();
      scannerRef.current = null;
      setIsCameraOpen(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("reader");
    try {
      const result = await html5QrCode.scanFile(file, true);
      fetchProductData(result);
    } catch (err) {
      alert("Не удалось распознать код на фото");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Сканер продуктов</h2>

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
              Загрузить фото
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

      {loading && <p style={{ textAlign: "center" }}>Ищем товар в базе...</p>}

      {/* КАРТОЧКА ТОВАРА */}
      {product && (
        <div className={styles.productCard}>
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "60px", borderRadius: "8px" }}
              />
            )}
            <div>
              <h3 style={{ margin: 0 }}>{product.name}</h3>
              <p
                style={{
                  color: "#4CAF50",
                  fontWeight: "bold",
                  margin: "5px 0 0",
                }}
              >
                {product.calories} ккал / 100г
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
              textAlign: "center",
            }}
          >
            <div className={styles.macro}>
              <span
                style={{ display: "block", fontSize: "12px", color: "#888" }}
              >
                Белки
              </span>
              <strong>{product.proteins}г</strong>
            </div>
            <div className={styles.macro}>
              <span
                style={{ display: "block", fontSize: "12px", color: "#888" }}
              >
                Жиры
              </span>
              <strong>{product.fats}г</strong>
            </div>
            <div className={styles.macro}>
              <span
                style={{ display: "block", fontSize: "12px", color: "#888" }}
              >
                Углев.
              </span>
              <strong>{product.carbs}г</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
