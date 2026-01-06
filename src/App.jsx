// Version améliorée – Calendrier type agenda + design mobile iOS-like

import { useState } from "react";

const RATE = 19.5;
const WEEKDAYS = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

function getMonthKey(date) {
  return date.toISOString().slice(0, 7); // YYYY-MM
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7; // lundi = 0
}

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("workDays");
    return saved ? JSON.parse(saved) : {};
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthKey = getMonthKey(currentDate);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const workedDays = data[monthKey] || [];
  const today = new Date();

  function toggleDay(day) {
    const date = new Date(year, month, day);
    if (date > today) return;

    const dateStr = `${monthKey}-${String(day).padStart(2, "0")}`;
    const updated = workedDays.includes(dateStr)
      ? workedDays.filter(d => d !== dateStr)
      : [...workedDays, dateStr];

    const newData = { ...data, [monthKey]: updated };
    setData(newData);
    localStorage.setItem("workDays", JSON.stringify(newData));
  }

  function changeMonth(offset) {
    setCurrentDate(new Date(year, month + offset, 1));
  }

  const total = workedDays.length * RATE;

  return (
    <div style={{
      maxWidth: 390,
      margin: "40px auto",
      padding: 16,
      background: "#0f172a",
      borderRadius: 24,
      fontFamily: "system-ui",
      boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
    }}>

      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => changeMonth(-1)}>◀</button>
        <h2 style={{ margin: 0, color: "#e5e7eb" }}>
          {currentDate.toLocaleString("fr-CH", { month: "long", year: "numeric" })}
        </h2>
        <button onClick={() => changeMonth(1)}>▶</button>
      </header>

      <p style={{ textAlign: "center", marginTop: 6, color: "#94a3b8" }}>
        19.50 CHF / jour
      </p>

      {/* Calendrier */}
      <div style={{ marginTop: 16, background: "#020617", padding: 14, borderRadius: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
          {WEEKDAYS.map(d => (
            <div key={d} style={{ textAlign: "center", fontSize: 12, color: "#94a3b8" }}>
              {d}
            </div>
          ))}

          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const date = new Date(year, month, day);
            const dateStr = `${monthKey}-${String(day).padStart(2, "0")}`;
            const worked = workedDays.includes(dateStr);
            const isToday = date.toDateString() === today.toDateString();
            const isFuture = date > today;

            return (
              <div
                key={day}
                onClick={() => toggleDay(day)}
                style={{
                  padding: 10,
                  textAlign: "center",
                  borderRadius: 12,
                  cursor: isFuture ? "not-allowed" : "pointer",
                  background: worked
                    ? "#22c55e"
                    : isToday
                    ? "#1e293b"
                    : "#020617",
                  color: isFuture ? "#475569" : worked ? "#052e16" : "#e5e7eb",
                  border: isToday ? "2px solid #3b82f6" : "1px solid #1e293b",
                  opacity: isFuture ? 0.4 : 1,
                  fontWeight: worked ? 700 : 500
                }}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Résumé */}
      <div style={{
        marginTop: 20,
        background: "#020617",
        padding: 18,
        borderRadius: 20,
        border: "1px solid #1e293b"
      }}>
        <p style={{ color: "#94a3b8", margin: 0 }}>Jours travaillés</p>
        <p style={{ fontSize: 18, margin: "4px 0", color: "#e5e7eb" }}>
          {workedDays.length} × 19.50 CHF
        </p>
        <h2 style={{ marginTop: 8, fontSize: 22, color: "#22c55e" }}>
          Total : {total.toFixed(2)} CHF
        </h2>
      </div>
    </div>
  );
}
