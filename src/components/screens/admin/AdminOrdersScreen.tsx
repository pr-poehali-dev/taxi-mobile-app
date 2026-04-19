import { useState } from "react";
import Icon from "@/components/ui/icon";

const initialOrders = [
  { id: "#4521", passenger: "Алексей С.", driver: "Артём К.", from: "Тверская, 18", to: "Шереметьево", price: 1240, status: "in_ride", time: "14:32" },
  { id: "#4522", passenger: "Мария В.", driver: "Иван Р.", from: "Арбат, 5", to: "Сокольники", price: 420, status: "waiting", time: "14:40" },
  { id: "#4523", passenger: "Пётр Н.", driver: "Дмитрий П.", from: "Курский вокзал", to: "Хамовники", price: 370, status: "in_ride", time: "14:45" },
  { id: "#4524", passenger: "Светлана К.", driver: "Михаил Л.", from: "ВДНХ", to: "Лубянка", price: 510, status: "searching", time: "14:52" },
  { id: "#4519", passenger: "Иван В.", driver: "—", from: "Домодедово", to: "Центр", price: 1100, status: "cancelled", time: "13:00" },
  { id: "#4518", passenger: "Ольга М.", driver: "Артём К.", from: "ТЦ Европейский", to: "Дом", price: 290, status: "done", time: "12:10" },
];

const statusMeta: Record<string, { label: string; color: string; bg: string }> = {
  in_ride: { label: "В пути", color: "#4ade80", bg: "rgba(34,197,94,0.1)" },
  waiting: { label: "Ожидание", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  searching: { label: "Поиск", color: "#00d4ff", bg: "rgba(0,212,255,0.1)" },
  cancelled: { label: "Отменён", color: "#f87171", bg: "rgba(239,68,68,0.1)" },
  done: { label: "Выполнен", color: "rgba(255,255,255,0.4)", bg: "rgba(255,255,255,0.05)" },
};

const AdminOrdersScreen = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState("all");

  const cancelOrder = (id: string) => setOrders(prev =>
    prev.map(o => o.id === id ? { ...o, status: "cancelled" } : o)
  );

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>Заказы</h1>
        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
          {orders.filter(o => ["in_ride", "waiting", "searching"].includes(o.status)).length} активных
        </p>
      </div>

      {/* Filter tabs */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {[
            { id: "all", label: "Все" },
            { id: "in_ride", label: "В пути" },
            { id: "waiting", label: "Ожидание" },
            { id: "searching", label: "Поиск" },
            { id: "cancelled", label: "Отменены" },
            { id: "done", label: "Завершены" },
          ].map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all"
              style={filter === f.id
                ? { background: "linear-gradient(135deg, #f59e0b, #f472b6)", color: "white" }
                : { background: "var(--card-bg)", border: "1px solid var(--card-border)", color: "rgba(255,255,255,0.4)" }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders list */}
      <div className="px-5 space-y-3">
        {filtered.map((order, idx) => {
          const s = statusMeta[order.status];
          const canCancel = ["in_ride", "waiting", "searching"].includes(order.status);
          return (
            <div key={order.id} className="rounded-2xl p-4 animate-fade-in"
              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", animationDelay: `${idx * 0.05}s` }}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono" style={{ color: "rgba(245,158,11,0.8)" }}>{order.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-lg font-medium"
                    style={{ background: s.bg, color: s.color }}>{s.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{order.time}</span>
                  {canCancel && (
                    <button onClick={() => cancelOrder(order.id)}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all active:scale-95"
                      style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
                      <Icon name="X" size={11} />
                      Отменить
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs mb-2">
                <span style={{ color: "rgba(255,255,255,0.4)" }}>👤 {order.passenger}</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>🚗 {order.driver}</span>
              </div>

              <div className="space-y-1 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#a855f7" }} />
                  <p className="text-xs text-white truncate">{order.from}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#00d4ff" }} />
                  <p className="text-xs text-white truncate">{order.to}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-white">{order.price} ₽</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-6" />
    </div>
  );
};

export default AdminOrdersScreen;
