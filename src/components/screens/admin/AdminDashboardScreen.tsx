import Icon from "@/components/ui/icon";

const activeOrders = [
  { id: "#4521", passenger: "Алексей С.", driver: "Артём К.", from: "Тверская, 18", to: "Шереметьево", status: "in_ride", price: 1240 },
  { id: "#4522", passenger: "Мария В.", driver: "Иван Р.", from: "Арбат, 5", to: "Сокольники", status: "waiting", price: 420 },
  { id: "#4523", passenger: "Пётр Н.", driver: "Дмитрий П.", from: "Курский вокзал", to: "Хамовники", status: "in_ride", price: 370 },
];

const statusMeta: Record<string, { label: string; color: string; bg: string }> = {
  in_ride: { label: "В пути", color: "#4ade80", bg: "rgba(34,197,94,0.1)" },
  waiting: { label: "Ожидание", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  searching: { label: "Поиск", color: "#00d4ff", bg: "rgba(0,212,255,0.1)" },
};

const AdminDashboardScreen = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(160deg, rgba(245,158,11,0.15) 0%, rgba(244,114,182,0.08) 40%, transparent 70%)" }} />
        <div className="px-5 pt-14 pb-4 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs tracking-widest uppercase font-semibold" style={{ color: "#f59e0b" }}>⚡ Администратор</p>
              <h1 className="text-2xl font-bold text-white mt-0.5" style={{ fontFamily: "Oswald, sans-serif" }}>Дашборд</h1>
            </div>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #f59e0b, #f472b6)", boxShadow: "0 4px 15px rgba(245,158,11,0.4)" }}>
              <Icon name="Shield" size={18} style={{ color: "white" }} />
            </div>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="px-5 mb-5 grid grid-cols-2 gap-3">
        {[
          { label: "Активных заказов", value: "24", icon: "ClipboardList", color: "#f59e0b", trend: "+3" },
          { label: "Водителей онлайн", value: "87", icon: "Car", color: "#4ade80", trend: "+12" },
          { label: "Выручка сегодня", value: "148 240 ₽", icon: "TrendingUp", color: "#00d4ff", trend: "+18%" },
          { label: "Жалоб", value: "2", icon: "AlertCircle", color: "#f87171", trend: "-1" },
        ].map((kpi) => (
          <div key={kpi.label} className="p-4 rounded-3xl"
            style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
            <div className="flex items-start justify-between mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${kpi.color}15` }}>
                <Icon name={kpi.icon} size={17} style={{ color: kpi.color }} />
              </div>
              <span className="text-xs px-2 py-0.5 rounded-lg font-semibold"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                {kpi.trend}
              </span>
            </div>
            <p className="text-lg font-bold text-white leading-tight">{kpi.value}</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Active orders */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
            Текущие заказы
          </p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
            <span className="text-xs" style={{ color: "#4ade80" }}>Живое</span>
          </div>
        </div>

        <div className="space-y-3">
          {activeOrders.map((order) => {
            const s = statusMeta[order.status];
            return (
              <div key={order.id} className="p-4 rounded-2xl"
                style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono" style={{ color: "rgba(245,158,11,0.8)" }}>{order.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-lg font-medium"
                      style={{ background: s.bg, color: s.color }}>
                      {s.label}
                    </span>
                  </div>
                  <button className="text-xs px-2 py-1 rounded-lg transition-all active:scale-95"
                    style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
                    Отменить
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>👤 {order.passenger}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>🚗 {order.driver}</span>
                  <span className="text-white truncate">{order.from}</span>
                  <span className="text-white truncate">{order.to}</span>
                </div>
                <div className="mt-2 text-right">
                  <span className="text-sm font-bold text-white">{order.price} ₽</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Online drivers heatmap */}
      <div className="px-5 mb-6">
        <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
          Активность за день
        </p>
        <div className="rounded-3xl p-4" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <div className="flex items-end gap-1.5" style={{ height: 60 }}>
            {[12,18,8,5,3,6,15,28,35,42,38,31,40,45,39,36,44,48,42,35,28,22,16,10].map((v, i) => (
              <div key={i} className="flex-1 rounded-t-sm transition-all"
                style={{
                  height: `${(v / 48) * 100}%`,
                  background: i >= 17 && i <= 19
                    ? "linear-gradient(to top, #f59e0b, #f472b6)"
                    : `rgba(245,158,11,${0.1 + (v / 48) * 0.5})`,
                  minHeight: 3,
                }} />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>00:00</span>
            <span className="text-[10px]" style={{ color: "#f59e0b" }}>Пик: 18-20ч</span>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>23:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardScreen;
