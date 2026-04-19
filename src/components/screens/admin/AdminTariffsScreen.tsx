import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Tariff {
  id: string;
  name: string;
  emoji: string;
  base: number;
  perKm: number;
  perMin: number;
  minPrice: number;
  color: string;
}

interface SurgeInterval {
  id: number;
  from: string;
  to: string;
  multiplier: number;
  days: string[];
  active: boolean;
}

const DAY_LABELS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const DAY_KEYS   = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const initialTariffs: Tariff[] = [
  { id: "economy",  name: "Эконом",   emoji: "🚗", base: 80,  perKm: 18, perMin: 3, minPrice: 180, color: "#4ade80" },
  { id: "delivery", name: "Доставка", emoji: "📦", base: 100, perKm: 22, perMin: 4, minPrice: 250, color: "#00d4ff" },
  { id: "cargo",    name: "Грузовой", emoji: "🚛", base: 200, perKm: 40, perMin: 8, minPrice: 600, color: "#f59e0b" },
];

const initialIntervals: SurgeInterval[] = [
  { id: 1, from: "07:00", to: "09:30", multiplier: 1.8, days: ["mon","tue","wed","thu","fri"], active: true },
  { id: 2, from: "17:30", to: "20:00", multiplier: 2.0, days: ["mon","tue","wed","thu","fri"], active: true },
  { id: 3, from: "22:00", to: "03:00", multiplier: 1.5, days: ["fri","sat"], active: false },
];

const emptyInterval = (): Omit<SurgeInterval, "id"> => ({
  from: "08:00", to: "10:00", multiplier: 1.5,
  days: ["mon","tue","wed","thu","fri"], active: true,
});

const AdminTariffsScreen = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>(initialTariffs);
  const [editing, setEditing] = useState<string | null>(null);
  const [intervals, setIntervals] = useState<SurgeInterval[]>(initialIntervals);
  const [addingInterval, setAddingInterval] = useState(false);
  const [newInterval, setNewInterval] = useState(emptyInterval());
  const [editingInterval, setEditingInterval] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"tariffs" | "surge">("tariffs");

  const updateTariff = (id: string, field: keyof Tariff, value: number) =>
    setTariffs(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));

  const toggleIntervalDay = (day: string, target: SurgeInterval | typeof newInterval, isNew: boolean) => {
    const days = target.days.includes(day)
      ? target.days.filter(d => d !== day)
      : [...target.days, day];
    if (isNew) {
      setNewInterval(p => ({ ...p, days }));
    } else {
      setIntervals(prev => prev.map(i => i.id === editingInterval ? { ...i, days } : i));
    }
  };

  const saveNewInterval = () => {
    setIntervals(prev => [...prev, { ...newInterval, id: Date.now() }]);
    setNewInterval(emptyInterval());
    setAddingInterval(false);
  };

  const removeInterval = (id: number) => setIntervals(prev => prev.filter(i => i.id !== id));

  const toggleIntervalActive = (id: number) =>
    setIntervals(prev => prev.map(i => i.id === id ? { ...i, active: !i.active } : i));

  const surgeColor = (m: number) =>
    m >= 2 ? "#f87171" : m >= 1.5 ? "#f59e0b" : "#4ade80";

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>Тарифы</h1>
        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Настройка параметров и коэффициентов</p>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-5">
        <div className="flex gap-1 p-1 rounded-2xl"
          style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          {[
            { id: "tariffs", label: "Тарифы" },
            { id: "surge",   label: "Коэффициенты" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as "tariffs" | "surge")}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={activeTab === tab.id
                ? { background: "linear-gradient(135deg, #f59e0b, #f472b6)", color: "white" }
                : { color: "rgba(255,255,255,0.4)" }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── TARIFFS TAB ── */}
      {activeTab === "tariffs" && (
        <div className="px-5 space-y-4 animate-fade-in">
          {tariffs.map((tariff) => {
            const isEditing = editing === tariff.id;
            return (
              <div key={tariff.id} className="rounded-3xl overflow-hidden"
                style={{
                  background: "var(--card-bg)",
                  border: isEditing ? `1px solid ${tariff.color}55` : "1px solid var(--card-border)",
                  boxShadow: isEditing ? `0 4px 24px ${tariff.color}20` : "none",
                }}>
                {isEditing && <div className="h-1" style={{ background: `linear-gradient(to right, ${tariff.color}, #f472b6)` }} />}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl"
                        style={{ background: `${tariff.color}18` }}>
                        {tariff.emoji}
                      </div>
                      <div>
                        <p className="font-bold text-white" style={{ fontFamily: "Oswald", letterSpacing: 1 }}>{tariff.name}</p>
                        <p className="text-xs" style={{ color: tariff.color }}>от {tariff.minPrice} ₽</p>
                      </div>
                    </div>
                    <button onClick={() => setEditing(isEditing ? null : tariff.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
                      style={isEditing
                        ? { background: `${tariff.color}20`, border: `1px solid ${tariff.color}40`, color: tariff.color }
                        : { background: "rgba(255,255,255,0.05)", border: "1px solid var(--card-border)", color: "rgba(255,255,255,0.5)" }}>
                      <Icon name={isEditing ? "Check" : "Edit2"} size={12} />
                      {isEditing ? "Сохранить" : "Изменить"}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      { field: "base" as keyof Tariff, label: "Посадка (₽)", step: 10 },
                      { field: "perKm" as keyof Tariff, label: "За км (₽)", step: 1 },
                      { field: "perMin" as keyof Tariff, label: "За мин (₽)", step: 0.5 },
                      { field: "minPrice" as keyof Tariff, label: "Минимум (₽)", step: 10 },
                    ]).map(({ field, label, step }) => (
                      <div key={field}>
                        <p className="text-[10px] mb-1.5 font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
                        {isEditing ? (
                          <input type="number" value={tariff[field] as number} step={step}
                            onChange={e => updateTariff(tariff.id, field, parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-xl text-sm font-bold text-white outline-none"
                            style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${tariff.color}40` }} />
                        ) : (
                          <div className="px-3 py-2 rounded-xl"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--card-border)" }}>
                            <span className="text-sm font-bold text-white">{tariff[field]}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="h-4" />
        </div>
      )}

      {/* ── SURGE TAB ── */}
      {activeTab === "surge" && (
        <div className="px-5 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
                Временные интервалы
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>
                Повышающий коэффициент по расписанию
              </p>
            </div>
            <button onClick={() => { setAddingInterval(true); setEditingInterval(null); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #f59e0b, #f472b6)", boxShadow: "0 4px 12px rgba(245,158,11,0.3)" }}>
              <Icon name="Plus" size={13} />
              Добавить
            </button>
          </div>

          {/* Add new interval form */}
          {addingInterval && (
            <div className="rounded-3xl overflow-hidden mb-4 animate-slide-up"
              style={{ border: "1px solid rgba(245,158,11,0.4)", boxShadow: "0 4px 24px rgba(245,158,11,0.1)" }}>
              <div className="h-1" style={{ background: "linear-gradient(to right, #f59e0b, #f472b6)" }} />
              <div className="p-4 space-y-4" style={{ background: "var(--card-bg)" }}>
                <p className="text-sm font-bold text-white">Новый интервал</p>

                {/* Time range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>С</p>
                    <input type="time" value={newInterval.from}
                      onChange={e => setNewInterval(p => ({ ...p, from: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl text-sm font-bold text-white outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,158,11,0.3)", colorScheme: "dark" }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>До</p>
                    <input type="time" value={newInterval.to}
                      onChange={e => setNewInterval(p => ({ ...p, to: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl text-sm font-bold text-white outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,158,11,0.3)", colorScheme: "dark" }} />
                  </div>
                </div>

                {/* Multiplier */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Коэффициент
                    </p>
                    <span className="text-lg font-bold" style={{ color: surgeColor(newInterval.multiplier), fontFamily: "Oswald" }}>
                      ×{newInterval.multiplier.toFixed(1)}
                    </span>
                  </div>
                  <input type="range" min="1" max="4" step="0.1"
                    value={newInterval.multiplier}
                    onChange={e => setNewInterval(p => ({ ...p, multiplier: parseFloat(e.target.value) }))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: surgeColor(newInterval.multiplier) }} />
                  <div className="flex justify-between mt-1">
                    <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.25)" }}>×1.0</span>
                    <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.25)" }}>×4.0</span>
                  </div>
                </div>

                {/* Days */}
                <div>
                  <p className="text-[10px] font-medium mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Дни недели</p>
                  <div className="flex gap-1.5">
                    {DAY_LABELS.map((label, i) => {
                      const key = DAY_KEYS[i];
                      const active = newInterval.days.includes(key);
                      return (
                        <button key={key} onClick={() => toggleIntervalDay(key, newInterval, true)}
                          className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                          style={active
                            ? { background: "linear-gradient(135deg, #f59e0b, #f472b6)", color: "white" }
                            : { background: "rgba(255,255,255,0.05)", border: "1px solid var(--card-border)", color: "rgba(255,255,255,0.3)" }}>
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button onClick={() => setAddingInterval(false)}
                    className="flex-1 py-3 rounded-2xl text-sm font-semibold transition-all active:scale-95"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--card-border)", color: "rgba(255,255,255,0.4)" }}>
                    Отмена
                  </button>
                  <button onClick={saveNewInterval}
                    className="flex-1 py-3 rounded-2xl text-sm font-bold text-white transition-all active:scale-95"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #f472b6)", boxShadow: "0 4px 15px rgba(245,158,11,0.3)" }}>
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Intervals list */}
          <div className="space-y-3">
            {intervals.map((interval) => {
              const isEditingThis = editingInterval === interval.id;
              const c = surgeColor(interval.multiplier);
              return (
                <div key={interval.id} className="rounded-3xl overflow-hidden"
                  style={{
                    background: "var(--card-bg)",
                    border: isEditingThis ? `1px solid ${c}50` : interval.active ? `1px solid ${c}25` : "1px solid var(--card-border)",
                    opacity: interval.active ? 1 : 0.55,
                  }}>
                  {isEditingThis && <div className="h-1" style={{ background: `linear-gradient(to right, ${c}, #f472b6)` }} />}

                  <div className="p-4">
                    {!isEditingThis ? (
                      /* View mode */
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ background: `${c}18` }}>
                              <Icon name="Clock" size={18} style={{ color: c }} />
                            </div>
                            <div>
                              <p className="font-bold text-white text-base" style={{ fontFamily: "Oswald" }}>
                                {interval.from} — {interval.to}
                              </p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                {interval.days.map(d => (
                                  <span key={d} className="text-[10px] font-semibold"
                                    style={{ color: "rgba(255,255,255,0.4)" }}>
                                    {DAY_LABELS[DAY_KEYS.indexOf(d)]}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold" style={{ color: c, fontFamily: "Oswald" }}>
                              ×{interval.multiplier.toFixed(1)}
                            </p>
                            <div className="flex items-center gap-1 justify-end mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full" style={{ background: interval.active ? "#4ade80" : "rgba(255,255,255,0.2)" }} />
                              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                                {interval.active ? "Активен" : "Выкл"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => toggleIntervalActive(interval.id)}
                            className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
                            style={interval.active
                              ? { background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }
                              : { background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80" }}>
                            {interval.active ? "Отключить" : "Включить"}
                          </button>
                          <button onClick={() => setEditingInterval(interval.id)}
                            className="px-3 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--card-border)", color: "rgba(255,255,255,0.5)" }}>
                            <Icon name="Edit2" size={13} />
                          </button>
                          <button onClick={() => removeInterval(interval.id)}
                            className="px-3 py-2 rounded-xl transition-all active:scale-95"
                            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                            <Icon name="Trash2" size={13} style={{ color: "#f87171" }} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Edit mode */
                      <div className="space-y-4">
                        <p className="text-sm font-bold text-white">Редактировать интервал</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-[10px] font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>С</p>
                            <input type="time" value={interval.from}
                              onChange={e => setIntervals(prev => prev.map(i => i.id === interval.id ? { ...i, from: e.target.value } : i))}
                              className="w-full px-3 py-2.5 rounded-xl text-sm font-bold text-white outline-none"
                              style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${c}40`, colorScheme: "dark" }} />
                          </div>
                          <div>
                            <p className="text-[10px] font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>До</p>
                            <input type="time" value={interval.to}
                              onChange={e => setIntervals(prev => prev.map(i => i.id === interval.id ? { ...i, to: e.target.value } : i))}
                              className="w-full px-3 py-2.5 rounded-xl text-sm font-bold text-white outline-none"
                              style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${c}40`, colorScheme: "dark" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Коэффициент</p>
                            <span className="text-lg font-bold" style={{ color: surgeColor(interval.multiplier), fontFamily: "Oswald" }}>
                              ×{interval.multiplier.toFixed(1)}
                            </span>
                          </div>
                          <input type="range" min="1" max="4" step="0.1" value={interval.multiplier}
                            onChange={e => setIntervals(prev => prev.map(i => i.id === interval.id ? { ...i, multiplier: parseFloat(e.target.value) } : i))}
                            className="w-full h-2 rounded-full appearance-none cursor-pointer"
                            style={{ accentColor: surgeColor(interval.multiplier) }} />
                          <div className="flex justify-between mt-1">
                            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.25)" }}>×1.0</span>
                            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.25)" }}>×4.0</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-medium mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Дни недели</p>
                          <div className="flex gap-1.5">
                            {DAY_LABELS.map((label, i) => {
                              const key = DAY_KEYS[i];
                              const active = interval.days.includes(key);
                              return (
                                <button key={key} onClick={() => toggleIntervalDay(key, interval, false)}
                                  className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                                  style={active
                                    ? { background: `linear-gradient(135deg, ${c}, #f472b6)`, color: "white" }
                                    : { background: "rgba(255,255,255,0.05)", border: "1px solid var(--card-border)", color: "rgba(255,255,255,0.3)" }}>
                                  {label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingInterval(null)}
                            className="flex-1 py-3 rounded-2xl text-sm font-semibold transition-all active:scale-95"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--card-border)", color: "rgba(255,255,255,0.4)" }}>
                            Отмена
                          </button>
                          <button onClick={() => setEditingInterval(null)}
                            className="flex-1 py-3 rounded-2xl text-sm font-bold text-white transition-all active:scale-95"
                            style={{ background: `linear-gradient(135deg, ${c}, #f472b6)`, boxShadow: `0 4px 15px ${c}40` }}>
                            Сохранить
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {intervals.length === 0 && !addingInterval && (
            <div className="flex flex-col items-center py-12">
              <span className="text-5xl mb-3">⚡</span>
              <p className="text-white font-semibold">Нет интервалов</p>
              <p className="text-sm mt-1 text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
                Нажмите «Добавить», чтобы создать расписание коэффициентов
              </p>
            </div>
          )}

          <div className="h-6" />
        </div>
      )}
    </div>
  );
};

export default AdminTariffsScreen;
