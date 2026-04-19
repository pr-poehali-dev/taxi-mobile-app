import { useState } from "react";
import Icon from "@/components/ui/icon";

const DriverHomeScreen = () => {
  const [isOnline, setIsOnline] = useState(true);

  const newOrder = {
    id: "#4521",
    passenger: "Алексей С.",
    rating: 4.9,
    from: "Тверская ул., 18",
    to: "Аэропорт Шереметьево",
    distance: "42 км",
    duration: "58 мин",
    price: 1240,
    type: "Комфорт",
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #00d4ff, transparent)", transform: "translate(30%,-30%)" }} />

        <div className="px-5 pt-14 pb-4 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Добрый день, Артём 👋</p>
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
                {isOnline ? "Вы онлайн" : "Вы офлайн"}
              </h1>
            </div>
            {/* Online toggle */}
            <button
              onClick={() => setIsOnline(!isOnline)}
              className="relative px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300"
              style={isOnline ? {
                background: "linear-gradient(135deg, #00d4ff, #0ea5e9)",
                color: "white",
                boxShadow: "0 4px 20px rgba(0,212,255,0.4)",
              } : {
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {isOnline ? "● Онлайн" : "○ Офлайн"}
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="mx-5 rounded-3xl overflow-hidden mb-5 relative" style={{ height: 180 }}>
          <div className="w-full h-full" style={{ background: "linear-gradient(135deg, #0d1117, #0f1923)" }}>
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <pattern id="grid2" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00d4ff" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid2)" />
            </svg>
            <svg className="absolute inset-0 w-full h-full">
              <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(0,212,255,0.4)" strokeWidth="3" />
              <line x1="200" y1="0" x2="200" y2="200" stroke="rgba(0,212,255,0.25)" strokeWidth="2" />
            </svg>
            <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
              <div className="relative">
                <div className="w-6 h-6 rounded-full animate-pulse" style={{ background: "#00d4ff", boxShadow: "0 0 20px rgba(0,212,255,0.8)" }} />
                <div className="absolute -inset-3 rounded-full opacity-25 animate-ping" style={{ background: "#00d4ff" }} />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl text-xs font-medium"
              style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.3)", color: "#7dd3fc" }}>
              📍 Toyota Camry · А123МК197
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-5 mb-5">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Сегодня", value: "3 250 ₽", icon: "Wallet", color: "#00d4ff" },
            { label: "Поездок", value: "8", icon: "Car", color: "#a855f7" },
            { label: "Рейтинг", value: "4.9", icon: "Star", color: "#f59e0b" },
          ].map((s) => (
            <div key={s.label} className="p-3 rounded-2xl text-center"
              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
              <Icon name={s.icon} size={16} style={{ color: s.color, margin: "0 auto 4px" }} />
              <p className="text-base font-bold text-white">{s.value}</p>
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Incoming order */}
      {isOnline && (
        <div className="px-5 animate-slide-up">
          <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
            Новый заказ
          </p>
          <div className="rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(0,212,255,0.3)", boxShadow: "0 4px 24px rgba(0,212,255,0.15)" }}>
            {/* Top gradient bar */}
            <div className="h-1" style={{ background: "linear-gradient(to right, #00d4ff, #a855f7)" }} />

            <div className="p-4" style={{ background: "var(--card-bg)" }}>
              {/* Passenger */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm"
                    style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)" }}>
                    АС
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{newOrder.passenger}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs">⭐</span>
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{newOrder.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white" style={{ fontFamily: "Oswald" }}>{newOrder.price} ₽</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{newOrder.type}</p>
                </div>
              </div>

              {/* Route */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#a855f7" }} />
                  <p className="text-sm text-white">{newOrder.from}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#00d4ff" }} />
                  <p className="text-sm text-white">{newOrder.to}</p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex gap-3 mb-4">
                <span className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)" }}>
                  📍 {newOrder.distance}
                </span>
                <span className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)" }}>
                  ⏱ {newOrder.duration}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-2xl text-sm font-semibold transition-all active:scale-95"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>
                  Отклонить
                </button>
                <button className="flex-1 py-3 rounded-2xl text-sm font-bold text-white transition-all active:scale-95"
                  style={{ background: "linear-gradient(135deg, #00d4ff, #0ea5e9)", boxShadow: "0 4px 15px rgba(0,212,255,0.35)" }}>
                  Принять
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isOnline && (
        <div className="px-5 flex flex-col items-center justify-center py-16 animate-fade-in">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4"
            style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
            <span className="text-4xl">😴</span>
          </div>
          <p className="text-white font-semibold text-lg">Вы офлайн</p>
          <p className="text-sm mt-1 text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
            Включите режим онлайн, чтобы получать заказы
          </p>
        </div>
      )}

      <div className="h-6" />
    </div>
  );
};

export default DriverHomeScreen;
