"use client";

import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

// ==================== ТИПЫ ====================
interface IProduct {
  name: string;
  brand: string;
  quantity: string;
  image: string;
  barcode: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

interface IMealEntry {
  id: number;
  name: string;
  grams: number;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  barcode: string;
  timestamp: string;
}

// ==================== КОМПОНЕНТ ====================
export default function Scanner() {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Функция поиска продукта с обходом CORS
  const fetchProductData = async (barcode: string) => {
    setLoading(true);
    setError(null);
    setProduct(null);

    try {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

      let response = await fetch(proxyUrl + apiUrl, {
        headers: {
          "User-Agent": "MyCalorieTracker/1.0 (contact@example.com)",
        },
      });

      if (!response.ok) {
        response = await fetch(apiUrl, {
          headers: {
            "User-Agent": "MyCalorieTracker/1.0 (contact@example.com)",
          },
          mode: "cors",
        });
      }

      const data = await response.json();

      if (data.status === 1 && data.product) {
        const p = data.product;
        const n = p.nutriments;

        setProduct({
          name: p.product_name_ru || p.product_name || "Неизвестный продукт",
          brand: p.brands || "Неизвестный бренд",
          quantity: p.quantity || "100 г",
          image: p.image_front_small_url || p.image_url || "",
          barcode: barcode,
          calories: Math.round(n["energy-kcal_100g"] || n["energy_100g"] || 0),
          proteins: n.proteins_100g || 0,
          fats: n.fat_100g || 0,
          carbs: n.carbohydrates_100g || 0,
        });
      } else {
        setError(`❌ Продукт с кодом ${barcode} не найден в базе`);
      }
    } catch (err) {
      console.error("Ошибка:", err);
      setError("❌ Ошибка подключения к серверу. Проверьте интернет.");
    } finally {
      setLoading(false);
    }
  };

  // Запуск камеры
  const startCamera = async () => {
    setError(null);
    setIsCameraOpen(true);

    setTimeout(async () => {
      const html5QrCode = new Html5Qrcode("reader");
      scannerRef.current = html5QrCode;

      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 150 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            fetchProductData(decodedText);
            stopCamera();
          },
          () => {},
        );
      } catch (err) {
        console.error("Ошибка камеры:", err);
        setError("❌ Не удалось открыть камеру. Проверьте разрешения.");
        setIsCameraOpen(false);
      }
    }, 100);
  };

  // Остановка камеры
  const stopCamera = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (err) {
        console.error("Ошибка остановки камеры:", err);
      }
      scannerRef.current = null;
    }
    setIsCameraOpen(false);
  };

  // Загрузка фото
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setProduct(null);

    const html5QrCode = new Html5Qrcode("reader-hidden");

    try {
      const result = await html5QrCode.scanFile(file, true);
      await fetchProductData(result);
    } catch (err) {
      setError("❌ Штрихкод на фото не распознан. Попробуйте другое фото.");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  // Добавление в дневник
  const addToDiary = (grams: number = 100) => {
    if (!product) return;

    const ratio = grams / 100;
    const mealEntry: IMealEntry = {
      id: Date.now(),
      name: product.name,
      grams: grams,
      calories: Math.round(product.calories * ratio),
      proteins: Math.round(product.proteins * ratio),
      fats: Math.round(product.fats * ratio),
      carbs: Math.round(product.carbs * ratio),
      barcode: product.barcode,
      timestamp: new Date().toISOString(),
    };

    const savedMeals: IMealEntry[] = JSON.parse(
      localStorage.getItem("dailyMeals") || "[]",
    );
    savedMeals.push(mealEntry);
    localStorage.setItem("dailyMeals", JSON.stringify(savedMeals));

    alert(`✅ ${grams}г "${product.name}" добавлено в дневник!`);
  };

  // Показать дневник
  const showDiary = () => {
    const meals: IMealEntry[] = JSON.parse(
      localStorage.getItem("dailyMeals") || "[]",
    );
    if (meals.length === 0) {
      alert("📭 Дневник пуст. Отсканируйте продукты!");
    } else {
      const totalCalories = meals.reduce(
        (sum: number, m: IMealEntry) => sum + m.calories,
        0,
      );
      const totalProteins = meals.reduce(
        (sum: number, m: IMealEntry) => sum + m.proteins,
        0,
      );
      const totalFats = meals.reduce(
        (sum: number, m: IMealEntry) => sum + m.fats,
        0,
      );
      const totalCarbs = meals.reduce(
        (sum: number, m: IMealEntry) => sum + m.carbs,
        0,
      );

      alert(
        `📊 ДНЕВНИК ПИТАНИЯ\n\n` +
          `📝 Записей: ${meals.length}\n` +
          `🔥 Калории: ${totalCalories} ккал\n` +
          `🥩 Белки: ${totalProteins} г\n` +
          `🧈 Жиры: ${totalFats} г\n` +
          `🍚 Углеводы: ${totalCarbs} г`,
      );
    }
  };

  // Очистить дневник
  const clearDiary = () => {
    if (confirm("🗑️ Удалить все записи из дневника?")) {
      localStorage.removeItem("dailyMeals");
      alert("✅ Дневник очищен!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📷 Сканер продуктов</h2>
        <p style={styles.subtitle}>Наведите камеру на штрихкод</p>

        <div id="reader-hidden" style={{ display: "none" }}></div>

        <div
          id="reader"
          style={{
            ...styles.reader,
            display: isCameraOpen ? "block" : "none",
          }}
        ></div>

        {!isCameraOpen && (
          <div style={styles.controls}>
            <button onClick={startCamera} style={styles.btnPrimary}>
              📷 Включить камеру
            </button>
            <label style={styles.btnSecondary}>
              📁 Выбрать фото
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>
        )}

        {isCameraOpen && (
          <button onClick={stopCamera} style={styles.btnCancel}>
            ❌ Закрыть камеру
          </button>
        )}

        {error && <div style={styles.error}>{error}</div>}

        {loading && (
          <div style={styles.loader}>
            <div style={styles.spinner}></div>
            <p>Поиск в базе продуктов...</p>
          </div>
        )}

        {product && (
          <div style={styles.result}>
            <div style={styles.productHeader}>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.productImage}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              <div>
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.brand}>{product.brand}</p>
                <p style={styles.quantity}>📦 {product.quantity}</p>
              </div>
            </div>

            <div style={styles.caloriesBlock}>
              <span style={styles.caloriesValue}>{product.calories}</span>
              <span style={styles.caloriesUnit}>ккал / 100г</span>
            </div>

            <div style={styles.macros}>
              <div style={{ ...styles.macroItem, borderTopColor: "#FF9800" }}>
                <span>🥩 Белки</span>
                <strong>{product.proteins} г</strong>
              </div>
              <div style={{ ...styles.macroItem, borderTopColor: "#E91E63" }}>
                <span>🧈 Жиры</span>
                <strong>{product.fats} г</strong>
              </div>
              <div style={{ ...styles.macroItem, borderTopColor: "#2196F3" }}>
                <span>🍚 Углеводы</span>
                <strong>{product.carbs} г</strong>
              </div>
            </div>

            <div style={styles.portionControl}>
              <label>Вес порции (г):</label>
              <input
                type="number"
                defaultValue={100}
                id="portionGrams"
                min={1}
                step={10}
                style={styles.portionInput}
              />
              <button
                onClick={() => {
                  const input = document.getElementById(
                    "portionGrams",
                  ) as HTMLInputElement;
                  const grams = parseInt(input.value);
                  addToDiary(grams);
                }}
                style={styles.btnAdd}
              >
                + Добавить в дневник
              </button>
            </div>

            <div style={styles.barcodeInfo}>📍 Штрихкод: {product.barcode}</div>
          </div>
        )}
      </div>

      <div style={styles.diaryButtons}>
        <button onClick={showDiary} style={styles.btnDiary}>
          📊 Показать дневник
        </button>
        <button onClick={clearDiary} style={styles.btnClear}>
          🗑️ Очистить дневник
        </button>
      </div>
    </div>
  );
}

// ==================== СТИЛИ ====================
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "28px",
    textAlign: "center" as const,
    color: "#333",
  },
  subtitle: {
    margin: "0 0 24px 0",
    textAlign: "center" as const,
    color: "#666",
    fontSize: "14px",
  },
  reader: {
    width: "100%",
    height: "300px",
    marginBottom: "16px",
    borderRadius: "12px",
    overflow: "hidden",
  },
  controls: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
  btnPrimary: {
    padding: "12px 24px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: 500,
  },
  btnSecondary: {
    padding: "12px 24px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: 500,
    display: "inline-block",
  },
  btnCancel: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "12px",
  },
  btnAdd: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: 500,
  },
  btnDiary: {
    flex: 1,
    padding: "14px",
    backgroundColor: "#9C27B0",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: 500,
  },
  btnClear: {
    flex: 1,
    padding: "14px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: 500,
  },
  diaryButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },
  error: {
    marginTop: "16px",
    padding: "12px",
    backgroundColor: "#ffebee",
    color: "#c62828",
    borderRadius: "10px",
    textAlign: "center" as const,
    fontSize: "14px",
  },
  loader: {
    marginTop: "24px",
    textAlign: "center" as const,
  },
  spinner: {
    width: "40px",
    height: "40px",
    margin: "0 auto 12px",
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #4CAF50",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  result: {
    marginTop: "24px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "16px",
  },
  productHeader: {
    display: "flex",
    gap: "16px",
    marginBottom: "16px",
  },
  productImage: {
    width: "80px",
    height: "80px",
    objectFit: "cover" as const,
    borderRadius: "12px",
  },
  productName: {
    margin: "0 0 4px 0",
    fontSize: "18px",
    color: "#333",
  },
  brand: {
    margin: "0 0 4px 0",
    fontSize: "14px",
    color: "#666",
  },
  quantity: {
    margin: "0",
    fontSize: "12px",
    color: "#888",
  },
  caloriesBlock: {
    textAlign: "center" as const,
    padding: "16px",
    backgroundColor: "#e8f5e9",
    borderRadius: "12px",
    marginBottom: "16px",
  },
  caloriesValue: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#4CAF50",
  },
  caloriesUnit: {
    fontSize: "16px",
    color: "#666",
    marginLeft: "8px",
  },
  macros: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  },
  macroItem: {
    flex: 1,
    padding: "12px",
    backgroundColor: "white",
    borderRadius: "10px",
    textAlign: "center" as const,
    borderTop: "4px solid",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  portionControl: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "12px",
  },
  portionInput: {
    width: "80px",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    textAlign: "center" as const,
  },
  barcodeInfo: {
    textAlign: "center" as const,
    fontSize: "12px",
    color: "#999",
    marginTop: "12px",
  },
};

// Добавляем анимацию
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleSheet);
}
