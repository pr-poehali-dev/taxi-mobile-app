import Icon from "@/components/ui/icon";

const orders = [
  { id: "#4521", passenger: "Алексей С.", from: "Тверская, 18", to: "Шереметьево", price: 1240, duration: "58 мин", rating: 5, date: "Сегодня 14:32", status: "done" },
  { id: "#4520", passenger: "Мария В.", from: "Красная площадь", to: "Патриаршие пруды", price: 390, duration: "20 мин", rating: 5, date: "Сегодня 12:10", status: "done" },
  { id: "#4519", passenger: "Дмитрий К.", from: "Белорусская", to: "Офис Сити", price: 310, duration: "15 мин", rating: 4, date: "Сегодня 10:45", status: "done" },
  { id: "#4518", passenger: "Светлана П.", from: "Парк Победы", to: "ВДНХ", price: 580, duration: "35 мин", rating: 5, date: "Вчера 20:15", status: "done" },
  { id: "#4517", passenger: "Иван Р.", from: "Домодедово", to: "Центр", price: 1100, duration: "55 мин", rating: 3, date: "Вчера 08:00", status: "cancelled" },
];

const DriverOrdersScreen = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #00d4ff, transparent)", transform: "translate(-30%,-30%)" }} />
        <div className="px-5 pt-14 pb-4 relative z-10">
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>История заказов</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>5 поездок за 2 дня</p>
        </div>
      </div>

      <div className="px-5 space-y-3">
        {orders.map((order, idx) => (
          <div key={order.id} className="rounded-3xl p-4 animate-slide-up"
            style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", animationDelay: `${idx * 0.07}s`, opacity: 0, animationFillMode: "forwards" }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono" style={{ color: "rgba(0,212,255,0.7)" }}>{order.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-lg font-medium ${order.status === "cancelled" ? "" : ""}`}
                    style={order.status === "cancelled"
                      ? { background: "rgba(239,68,68,0.1)", color: "#f87171" }
                      : { background: "rgba(34,197,94,0.1)", color: "#4ade80" }}>
                    {order.status === "cancelled" ? "Отменён" : "Выполнен"}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white mt-0.5">{order.passenger}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{order.date}</p>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-white">{order.price} ₽</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{order.duration}</p>
              </div>
            </div>

            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#a855f7" }} />
                <p className="text-xs text-white truncate">{order.from}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#00d4ff" }} />
                <p className="text-xs text-white truncate">{order.to}</p>
              </div>
            </div>

            {order.status !== "cancelled" && (
              <div className="flex items-center gap-1 pt-2" style={{ borderTop: "1px solid var(--card-border)" }}>
                <p className="text-xs mr-1" style={{ color: "rgba(255,255,255,0.35)" }}>Оценка:</p>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-xs" style={{ opacity: i < order.rating ? 1 : 0.2 }}>⭐</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="h-6" />
    </div>
  );
};

export default DriverOrdersScreen;
