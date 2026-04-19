import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { CarCard } from "@/pages/Index";

interface Props {
  onBack: () => void;
  carCard: CarCard | null;
  onCarSave: (car: CarCard) => void;
}

const categories = ["Эконом", "Комфорт", "Бизнес", "Минивэн"];
const colors = ["Белый", "Чёрный", "Серебристый", "Серый", "Синий", "Красный", "Другой"];

const DriverProfileScreen = ({ onBack, carCard, onCarSave }: Props) => {
  const [toggles, setToggles] = useState({ Bell: true, MapPin: true, AutoAccept: false });
  const toggle = (k: keyof typeof toggles) => setToggles(p => ({ ...p, [k]: !p[k] }));

  const [editingCar, setEditingCar] = useState(!carCard);
  const [form, setForm] = useState<CarCard>(carCard ?? {
    brand: "", model: "", year: "", plate: "", color: "Белый", category: "Эконом",
  });

  const set = (field: keyof CarCard, val: string) => setForm(p => ({ ...p, [field]: val }));

  const handleSave = () => {
    if (!form.brand.trim() || !form.model.trim() || !form.plate.trim() || !form.year.trim()) return;
    onCarSave(form);
    setEditingCar(false);
  };

  const isFormValid = form.brand.trim() && form.model.trim() && form.plate.trim() && form.year.trim();

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, rgba(0,212,255,0.2) 0%, rgba(14,165,233,0.1) 40%, transparent 70%)" }} />
        <div className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #00d4ff, transparent)", transform: "translate(30%,-30%)" }} />

        <div className="relative z-10 px-5 pt-14 pb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-2xl font-bold text-white"
                style={{ background: "linear-gradient(135deg, #00d4ff, #0ea5e9)", boxShadow: "0 8px 32px rgba(0,212,255,0.4)" }}>
                АК
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg flex items-center justify-center"
                style={carCard
                  ? { background: "#22d3ee", border: "2px solid var(--dark-bg)" }
                  : { background: "#f59e0b", border: "2px solid var(--dark-bg)" }}>
                <Icon name={carCard ? "Check" : "AlertCircle"} size={12} style={{ color: "white" }} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>Артём Ковалёв</h2>
              <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>+7 (926) 100-22-33</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg"
                  style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}>
                  <span className="text-xs">⭐</span>
                  <span className="text-xs font-bold" style={{ color: "#f59e0b" }}>4.9</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg"
                  style={carCard
                    ? { background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.25)" }
                    : { background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)" }}>
                  <span className="text-xs font-semibold" style={{ color: carCard ? "#7dd3fc" : "#f59e0b" }}>
                    {carCard ? "Авто добавлено ✓" : "Нет авто ⚠"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Car card section */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
            Карточка автомобиля
          </p>
          {carCard && !editingCar && (
            <button onClick={() => setEditingCar(true)}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition-all"
              style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", color: "#00d4ff" }}>
              <Icon name="Edit2" size={11} />
              Изменить
            </button>
          )}
        </div>

        {/* No car warning banner */}
        {!carCard && !editingCar && (
          <div className="p-4 rounded-2xl mb-3 flex items-center gap-3"
            style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)" }}>
            <Icon name="AlertTriangle" size={18} style={{ color: "#f59e0b" }} />
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: "#f59e0b" }}>Авто не добавлено</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                Без карточки авто нельзя выйти онлайн и принимать заказы
              </p>
            </div>
          </div>
        )}

        {/* Car display (saved) */}
        {carCard && !editingCar && (
          <div className="p-4 rounded-2xl animate-fade-in"
            style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)" }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🚗</span>
              <div className="flex-1">
                <p className="text-base font-bold text-white">{carCard.brand} {carCard.model} {carCard.year}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {carCard.color} · {carCard.category}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: "#00d4ff" }}>{carCard.plate}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 px-3 py-1.5 rounded-xl text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--card-border)" }}>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Категория</p>
                <p className="text-xs font-semibold text-white mt-0.5">{carCard.category}</p>
              </div>
              <div className="flex-1 px-3 py-1.5 rounded-xl text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--card-border)" }}>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Цвет</p>
                <p className="text-xs font-semibold text-white mt-0.5">{carCard.color}</p>
              </div>
              <div className="flex-1 px-3 py-1.5 rounded-xl text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--card-border)" }}>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Год</p>
                <p className="text-xs font-semibold text-white mt-0.5">{carCard.year}</p>
              </div>
            </div>
          </div>
        )}

        {/* Car form (editing) */}
        {editingCar && (
          <div className="rounded-3xl overflow-hidden animate-slide-up"
            style={{ border: "1px solid rgba(0,212,255,0.35)", boxShadow: "0 4px 24px rgba(0,212,255,0.1)" }}>
            <div className="h-1" style={{ background: "linear-gradient(to right, #00d4ff, #a855f7)" }} />
            <div className="p-4 space-y-3" style={{ background: "var(--card-bg)" }}>

              {/* Brand + Model */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Марка <span style={{ color: "#f87171" }}>*</span>
                  </p>
                  <input value={form.brand} onChange={e => set("brand", e.target.value)}
                    placeholder="Toyota"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none placeholder:text-gray-600"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--card-border)" }} />
                </div>
                <div>
                  <p className="text-[10px] font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Модель <span style={{ color: "#f87171" }}>*</span>
                  </p>
                  <input value={form.model} onChange={e => set("model", e.target.value)}
                    placeholder="Camry"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none placeholder:text-gray-600"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--card-border)" }} />
                </div>
              </div>

              {/* Year + Plate */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Год <span style={{ color: "#f87171" }}>*</span>
                  </p>
                  <input value={form.year} onChange={e => set("year", e.target.value)}
                    placeholder="2021" maxLength={4}
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none placeholder:text-gray-600"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--card-border)" }} />
                </div>
                <div>
                  <p className="text-[10px] font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Госномер <span style={{ color: "#f87171" }}>*</span>
                  </p>
                  <input value={form.plate} onChange={e => set("plate", e.target.value.toUpperCase())}
                    placeholder="А123МК197"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none placeholder:text-gray-600 font-mono"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--card-border)" }} />
                </div>
              </div>

              {/* Color */}
              <div>
                <p className="text-[10px] font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>Цвет</p>
                <div className="flex flex-wrap gap-2">
                  {colors.map(c => (
                    <button key={c} onClick={() => set("color", c)}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                      style={form.color === c
                        ? { background: "rgba(0,212,255,0.2)", border: "1px solid rgba(0,212,255,0.5)", color: "#00d4ff" }
                        : { background: "rgba(255,255,255,0.04)", border: "1px solid var(--card-border)", color: "rgba(255,255,255,0.45)" }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <p className="text-[10px] font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>Категория</p>
                <div className="grid grid-cols-4 gap-2">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => set("category", cat)}
                      className="py-2 rounded-xl text-xs font-semibold transition-all"
                      style={form.category === cat
                        ? { background: "rgba(0,212,255,0.2)", border: "1px solid rgba(0,212,255,0.5)", color: "#00d4ff" }
                        : { background: "rgba(255,255,255,0.04)", border: "1px solid var(--card-border)", color: "rgba(255,255,255,0.45)" }}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save / Cancel */}
              <div className="flex gap-2 pt-1">
                {carCard && (
                  <button onClick={() => setEditingCar(false)}
                    className="flex-1 py-3 rounded-2xl text-sm font-semibold transition-all active:scale-95"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--card-border)", color: "rgba(255,255,255,0.4)" }}>
                    Отмена
                  </button>
                )}
                <button onClick={handleSave} disabled={!isFormValid}
                  className="flex-1 py-3 rounded-2xl text-sm font-bold text-white transition-all active:scale-95"
                  style={isFormValid
                    ? { background: "linear-gradient(135deg, #00d4ff, #0ea5e9)", boxShadow: "0 4px 15px rgba(0,212,255,0.35)" }
                    : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}>
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="px-5 mb-5 grid grid-cols-3 gap-3">
        {[
          { label: "Поездок", value: "1 240", color: "#00d4ff" },
          { label: "Рейтинг", value: "4.9 ⭐", color: "#f59e0b" },
          { label: "Отказов", value: "2%", color: "#4ade80" },
        ].map((s) => (
          <div key={s.label} className="p-3 rounded-2xl text-center"
            style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
            <p className="text-base font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="px-5 mb-5">
        <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>Настройки</p>
        <div className="rounded-3xl overflow-hidden" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          {[
            { key: "Bell" as const, icon: "Bell", label: "Уведомления о заказах" },
            { key: "MapPin" as const, icon: "MapPin", label: "Геолокация" },
            { key: "AutoAccept" as const, icon: "Zap", label: "Автоприём заказов" },
          ].map((s, idx, arr) => (
            <div key={s.key}>
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,212,255,0.1)" }}>
                  <Icon name={s.icon} size={15} style={{ color: "#00d4ff" }} />
                </div>
                <p className="text-sm font-medium text-white flex-1">{s.label}</p>
                <button onClick={() => toggle(s.key)}
                  className="relative w-11 h-6 rounded-full transition-all duration-300"
                  style={{ background: toggles[s.key] ? "linear-gradient(135deg, #00d4ff, #0ea5e9)" : "rgba(255,255,255,0.1)" }}>
                  <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
                    style={{ left: toggles[s.key] ? "calc(100% - 22px)" : "2px" }} />
                </button>
              </div>
              {idx < arr.length - 1 && <div style={{ height: 1, background: "var(--card-border)", marginLeft: 56 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 mb-6 space-y-3">
        <button onClick={onBack}
          className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
          style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#7dd3fc" }}>
          <Icon name="ArrowLeft" size={15} />
          Сменить профиль
        </button>
        <button className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-all active:scale-95"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
};

export default DriverProfileScreen;
