import { useState } from "react";
import Icon from "@/components/ui/icon";

const initialDrivers = [
  { id: 1, name: "Артём Ковалёв", phone: "+7 (926) 100-22-33", car: "Toyota Camry · А123МК197", rating: 4.9, trips: 1240, online: true, status: "active" },
  { id: 2, name: "Иван Романов", phone: "+7 (916) 555-11-22", car: "Hyundai Sonata · В456ОП199", rating: 4.7, trips: 890, online: true, status: "active" },
  { id: 3, name: "Дмитрий Петров", phone: "+7 (965) 333-44-55", car: "Kia K5 · С789УФ197", rating: 4.8, trips: 654, online: false, status: "active" },
  { id: 4, name: "Михаил Лебедев", phone: "+7 (977) 222-66-77", car: "Skoda Octavia · Е321ХЦ777", rating: 4.5, trips: 321, online: false, status: "blocked" },
];

const AdminDriversScreen = () => {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCar, setNewCar] = useState("");

  const addDriver = () => {
    if (!newName.trim()) return;
    setDrivers(prev => [...prev, {
      id: Date.now(), name: newName, phone: newPhone, car: newCar,
      rating: 0, trips: 0, online: false, status: "active",
    }]);
    setNewName(""); setNewPhone(""); setNewCar("");
    setShowAdd(false);
  };

  const removeDriver = (id: number) => setDrivers(prev => prev.filter(d => d.id !== id));
  const toggleBlock = (id: number) => setDrivers(prev => prev.map(d =>
    d.id === id ? { ...d, status: d.status === "blocked" ? "active" : "blocked" } : d
  ));

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>Водители</h1>
            <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
              {drivers.filter(d => d.online).length} онлайн · {drivers.length} всего
            </p>
          </div>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #f59e0b, #f472b6)", boxShadow: "0 4px 15px rgba(245,158,11,0.35)" }}>
            <Icon name="Plus" size={16} />
            Добавить
          </button>
        </div>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="px-5 mb-4 animate-slide-up">
          <div className="rounded-3xl p-4 space-y-3"
            style={{ background: "var(--card-bg)", border: "1px solid rgba(245,158,11,0.3)" }}>
            <p className="text-sm font-semibold text-white">Новый водитель</p>
            {[
              { val: newName, set: setNewName, placeholder: "Имя водителя" },
              { val: newPhone, set: setNewPhone, placeholder: "Телефон" },
              { val: newCar, set: setNewCar, placeholder: "Авто · Номер" },
            ].map((field, i) => (
              <input key={i} value={field.val} onChange={e => field.set(e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 rounded-xl bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--card-border)" }} />
            ))}
            <div className="flex gap-2">
              <button onClick={() => setShowAdd(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
                Отмена
              </button>
              <button onClick={addDriver}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg, #f59e0b, #f472b6)" }}>
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drivers list */}
      <div className="px-5 space-y-3">
        {drivers.map((driver, idx) => (
          <div key={driver.id} className="rounded-3xl p-4 animate-slide-up"
            style={{
              background: "var(--card-bg)",
              border: driver.status === "blocked"
                ? "1px solid rgba(239,68,68,0.25)"
                : "1px solid var(--card-border)",
              animationDelay: `${idx * 0.06}s`,
              opacity: 0,
              animationFillMode: "forwards",
            }}>
            <div className="flex items-start gap-3">
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm"
                  style={{ background: driver.status === "blocked" ? "rgba(239,68,68,0.2)" : "linear-gradient(135deg, #f59e0b, #f472b6)" }}>
                  {driver.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                {driver.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                    style={{ background: "#4ade80", borderColor: "var(--dark-bg)" }} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">{driver.name}</p>
                  {driver.status === "blocked" && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md"
                      style={{ background: "rgba(239,68,68,0.12)", color: "#f87171" }}>Блок</span>
                  )}
                </div>
                <p className="text-xs mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{driver.car}</p>
                <div className="flex items-center gap-3 mt-1">
                  {driver.rating > 0 && (
                    <span className="text-xs" style={{ color: "#f59e0b" }}>⭐ {driver.rating}</span>
                  )}
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {driver.trips} поездок
                  </span>
                  <span className="text-xs" style={{ color: driver.online ? "#4ade80" : "rgba(255,255,255,0.25)" }}>
                    {driver.online ? "● Онлайн" : "○ Офлайн"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: "1px solid var(--card-border)" }}>
              <button onClick={() => toggleBlock(driver.id)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
                style={driver.status === "blocked"
                  ? { background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#4ade80" }
                  : { background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b" }}>
                {driver.status === "blocked" ? "Разблокировать" : "Заблокировать"}
              </button>
              <button onClick={() => removeDriver(driver.id)}
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all active:scale-95"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)" }}>
                <Icon name="Trash2" size={14} style={{ color: "#f87171" }} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="h-6" />
    </div>
  );
};

export default AdminDriversScreen;
