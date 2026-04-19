import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  onBack: () => void;
}

const DriverProfileScreen = ({ onBack }: Props) => {
  const [toggles, setToggles] = useState({ Bell: true, MapPin: true, AutoAccept: false });
  const toggle = (k: keyof typeof toggles) => setToggles(p => ({ ...p, [k]: !p[k] }));

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
                style={{ background: "#22d3ee", border: "2px solid var(--dark-bg)" }}>
                <Icon name="Check" size={12} style={{ color: "white" }} />
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
                  style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.25)" }}>
                  <span className="text-xs font-semibold" style={{ color: "#7dd3fc" }}>Подтверждён ✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Car info */}
          <div className="mt-4 p-4 rounded-2xl"
            style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚗</span>
                <div>
                  <p className="text-sm font-semibold text-white">Toyota Camry 2021</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Серебристый · Комфорт</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: "#00d4ff" }}>А123МК197</p>
              </div>
            </div>
          </div>
        </div>
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
