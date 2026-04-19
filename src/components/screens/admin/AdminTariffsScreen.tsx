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
  surge: number;
  color: string;
}

const initialTariffs: Tariff[] = [
  { id: "economy", name: "Эконом", emoji: "🚗", base: 80, perKm: 18, perMin: 3, minPrice: 180, surge: 1.0, color: "#4ade80" },
  { id: "comfort", name: "Комфорт", emoji: "🚙", base: 120, perKm: 28, perMin: 5, minPrice: 320, surge: 1.0, color: "#00d4ff" },
  { id: "business", name: "Бизнес", emoji: "🚘", base: 200, perKm: 45, perMin: 8, minPrice: 580, surge: 1.2, color: "#a855f7" },
];

const AdminTariffsScreen = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>(initialTariffs);
  const [editing, setEditing] = useState<string | null>(null);

  const update = (id: string, field: keyof Tariff, value: number) => {
    setTariffs(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>Тарифы</h1>
        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Настройка параметров тарифов</p>
      </div>

      <div className="px-5 space-y-4">
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

              {/* Header */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: `${tariff.color}18` }}>
                      {tariff.emoji}
                    </div>
                    <div>
                      <p className="font-bold text-white" style={{ fontFamily: "Oswald", letterSpacing: 1 }}>
                        {tariff.name}
                      </p>
                      <p className="text-xs" style={{ color: tariff.color }}>
                        от {tariff.minPrice} ₽
                      </p>
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

                {/* Fields */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { field: "base" as keyof Tariff, label: "Посадка (₽)", step: 10 },
                    { field: "perKm" as keyof Tariff, label: "За км (₽)", step: 1 },
                    { field: "perMin" as keyof Tariff, label: "За мин (₽)", step: 0.5 },
                    { field: "minPrice" as keyof Tariff, label: "Минимум (₽)", step: 10 },
                  ].map(({ field, label, step }) => (
                    <div key={field}>
                      <p className="text-[10px] mb-1.5 font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
                      {isEditing ? (
                        <input
                          type="number"
                          value={tariff[field] as number}
                          step={step}
                          onChange={e => update(tariff.id, field, parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-xl text-sm font-bold text-white outline-none"
                          style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${tariff.color}40` }}
                        />
                      ) : (
                        <div className="px-3 py-2 rounded-xl"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--card-border)" }}>
                          <span className="text-sm font-bold text-white">{tariff[field]}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Surge */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Коэффициент повышения × {tariff.surge.toFixed(1)}
                    </p>
                    {tariff.surge > 1 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-lg"
                        style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>
                        Активен
                      </span>
                    )}
                  </div>
                  <input type="range" min="1" max="3" step="0.1" value={tariff.surge}
                    onChange={e => isEditing && update(tariff.id, "surge", parseFloat(e.target.value))}
                    disabled={!isEditing}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: tariff.color, background: `linear-gradient(to right, ${tariff.color} ${((tariff.surge - 1) / 2) * 100}%, rgba(255,255,255,0.1) ${((tariff.surge - 1) / 2) * 100}%)` }}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.25)" }}>×1.0</span>
                    <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.25)" }}>×3.0</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global surge alert */}
      <div className="px-5 mt-4 mb-6">
        <div className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
          <Icon name="Zap" size={18} style={{ color: "#f59e0b" }} />
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Глобальный повышающий коэффициент</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Применяется ко всем тарифам сразу</p>
          </div>
          <button className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
            style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#f59e0b" }}>
            Вкл
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTariffsScreen;
