import Icon from "@/components/ui/icon";

const days = [
  { day: "Пн", amount: 3200, trips: 7 },
  { day: "Вт", amount: 4100, trips: 9 },
  { day: "Ср", amount: 2800, trips: 6 },
  { day: "Чт", amount: 5200, trips: 11 },
  { day: "Пт", amount: 6400, trips: 14 },
  { day: "Сб", amount: 7800, trips: 16 },
  { day: "Вс", amount: 3250, trips: 8 },
];

const maxAmount = Math.max(...days.map(d => d.amount));

const DriverEarningsScreen = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #00d4ff, transparent)", transform: "translate(30%,-30%)" }} />
        <div className="px-5 pt-14 pb-4 relative z-10">
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>Заработок</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Эта неделя</p>
        </div>
      </div>

      {/* Total earnings card */}
      <div className="px-5 mb-5">
        <div className="rounded-3xl p-5"
          style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(14,165,233,0.1))", border: "1px solid rgba(0,212,255,0.25)" }}>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Итого за неделю</p>
          <p className="text-4xl font-bold text-white mt-1" style={{ fontFamily: "Oswald, sans-serif" }}>
            32 750 ₽
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <Icon name="TrendingUp" size={12} style={{ color: "#4ade80" }} />
              <span className="text-xs font-semibold" style={{ color: "#4ade80" }}>+18% к прошлой неделе</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mb-5 grid grid-cols-3 gap-3">
        {[
          { label: "Поездок", value: "71", icon: "Car", color: "#00d4ff" },
          { label: "Часов", value: "48", icon: "Clock", color: "#a855f7" },
          { label: "Рейтинг", value: "4.9", icon: "Star", color: "#f59e0b" },
        ].map((s) => (
          <div key={s.label} className="p-3 rounded-2xl text-center"
            style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
            <Icon name={s.icon} size={16} style={{ color: s.color, margin: "0 auto 4px" }} />
            <p className="text-lg font-bold text-white">{s.value}</p>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="px-5 mb-5">
        <div className="rounded-3xl p-5" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <p className="text-sm font-semibold text-white mb-4">Заработок по дням</p>
          <div className="flex items-end gap-2" style={{ height: 100 }}>
            {days.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <p className="text-[9px] font-medium" style={{ color: i === 6 ? "#00d4ff" : "rgba(255,255,255,0.4)" }}>
                  {d.amount >= 1000 ? `${(d.amount / 1000).toFixed(1)}к` : d.amount}
                </p>
                <div className="w-full rounded-t-xl transition-all duration-500"
                  style={{
                    height: `${(d.amount / maxAmount) * 80}%`,
                    background: i === 6
                      ? "linear-gradient(to top, #00d4ff, #0ea5e9)"
                      : "rgba(0,212,255,0.18)",
                    minHeight: 8,
                  }} />
                <span className="text-[10px]" style={{ color: i === 6 ? "#00d4ff" : "rgba(255,255,255,0.3)" }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payout */}
      <div className="px-5 mb-6">
        <div className="rounded-3xl p-5 flex items-center justify-between"
          style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Доступно к выводу</p>
            <p className="text-2xl font-bold text-white mt-0.5" style={{ fontFamily: "Oswald" }}>28 500 ₽</p>
          </div>
          <button className="px-5 py-3 rounded-2xl text-sm font-bold text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #00d4ff, #0ea5e9)", boxShadow: "0 4px 20px rgba(0,212,255,0.35)" }}>
            Вывести
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverEarningsScreen;
