import { useState } from "react";
import Icon from "@/components/ui/icon";

const trips = [
  {
    id: 1,
    date: "Сегодня, 14:32",
    from: "Тверская ул., 18",
    to: "Аэропорт Шереметьево",
    price: 1240,
    distance: "42 км",
    duration: "58 мин",
    driver: "Артём К.",
    rating: 5,
    status: "completed",
    type: "Комфорт",
  },
  {
    id: 2,
    date: "Вчера, 09:15",
    from: "Дом",
    to: "Офис (Москва-Сити)",
    price: 380,
    distance: "8.7 км",
    duration: "22 мин",
    driver: "Михаил Р.",
    rating: 4,
    status: "completed",
    type: "Эконом",
  },
  {
    id: 3,
    date: "18 апр, 20:44",
    from: "ТЦ Авиапарк",
    to: "Дом",
    price: 290,
    distance: "5.1 км",
    duration: "18 мин",
    driver: "Дмитрий П.",
    rating: 5,
    status: "completed",
    type: "Эконом",
  },
  {
    id: 4,
    date: "17 апр, 16:00",
    from: "Офис",
    to: "Бизнес-центр Нордстар",
    price: 620,
    distance: "11.3 км",
    duration: "31 мин",
    driver: "Иван В.",
    rating: 4,
    status: "completed",
    type: "Бизнес",
  },
];

const stats = [
  { label: "Поездок", value: "147", icon: "Car", color: "#a855f7" },
  { label: "Потрачено", value: "38 200 ₽", icon: "Wallet", color: "#00d4ff" },
  { label: "Рейтинг", value: "4.9", icon: "Star", color: "#f59e0b" },
  { label: "Сэкономлено", value: "12%", icon: "TrendingDown", color: "#22d3ee" },
];

const HistoryScreen = () => {
  const [activeTab, setActiveTab] = useState<"history" | "stats">("history");

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #00d4ff, transparent)", transform: "translate(-40%, -40%)" }}
        />
        <div className="px-5 pt-14 pb-4 relative z-10">
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
            Мои поездки
          </h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>147 поездок всего</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-5">
        <div
          className="flex gap-1 p-1 rounded-2xl"
          style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
        >
          {[
            { id: "history", label: "История" },
            { id: "stats", label: "Статистика" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "history" | "stats")}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={activeTab === tab.id ? {
                background: "linear-gradient(135deg, #a855f7, #6366f1)",
                color: "white",
                boxShadow: "0 4px 15px rgba(168,85,247,0.3)",
              } : { color: "rgba(255,255,255,0.4)" }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "stats" ? (
        <div className="px-5 animate-fade-in">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-3xl"
                style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${stat.color}18` }}
                >
                  <Icon name={stat.icon} size={18} style={{ color: stat.color }} />
                </div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Chart placeholder */}
          <div
            className="rounded-3xl p-5 mb-5"
            style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
          >
            <p className="text-sm font-semibold text-white mb-4">Расходы по месяцам</p>
            <div className="flex items-end gap-2 h-24">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${h}%`,
                      background: i === 6
                        ? "linear-gradient(to top, #a855f7, #00d4ff)"
                        : "rgba(168,85,247,0.2)",
                    }}
                  />
                  <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {["Окт", "Ноя", "Дек", "Янв", "Фев", "Мар", "Апр"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating breakdown */}
          <div
            className="rounded-3xl p-5"
            style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
          >
            <p className="text-sm font-semibold text-white mb-4">Мой рейтинг пассажира</p>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-4xl font-bold" style={{ fontFamily: "Oswald", background: "linear-gradient(135deg, #f59e0b, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>4.9</p>
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} className="text-sm">{s <= 5 ? "⭐" : "☆"}</span>
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {[5,4,3,2,1].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs w-4" style={{ color: "rgba(255,255,255,0.4)" }}>{star}</span>
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: "var(--card-border)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: star === 5 ? "80%" : star === 4 ? "15%" : "3%",
                          background: "linear-gradient(to right, #f59e0b, #f472b6)",
                        }}
                      />
                    </div>
                    <span className="text-xs w-6" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {star === 5 ? "80%" : star === 4 ? "15%" : "3%"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-5 space-y-3 animate-fade-in">
          {trips.map((trip, idx) => (
            <div
              key={trip.id}
              className="rounded-3xl p-4 transition-all duration-200 active:scale-98"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                animationDelay: `${idx * 0.08}s`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{trip.date}</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{trip.driver}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-white">{trip.price} ₽</p>
                  <div
                    className="inline-block px-2 py-0.5 rounded-lg text-xs mt-0.5"
                    style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc" }}
                  >
                    {trip.type}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#a855f7" }} />
                  <p className="text-xs text-white truncate">{trip.from}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#00d4ff" }} />
                  <p className="text-xs text-white truncate">{trip.to}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid var(--card-border)" }}>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    📍 {trip.distance}
                  </span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    ⏱ {trip.duration}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-xs" style={{ opacity: i < trip.rating ? 1 : 0.2 }}>⭐</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="h-6" />
    </div>
  );
};

export default HistoryScreen;
