import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import RideToast, { type Toast } from "@/components/RideToast";

interface Props {
  onFinish: () => void;
  onChat: () => void;
}

const TOTAL_SECONDS = 58 * 60;
const ARRIVAL_SECONDS = 3 * 60;

type RidePhase = "arriving" | "in_ride" | "done";

const ActiveRideScreen = ({ onFinish, onChat }: Props) => {
  const [phase, setPhase] = useState<RidePhase>("arriving");
  const [arrivalSecondsLeft, setArrivalSecondsLeft] = useState(ARRIVAL_SECONDS);
  const [rideSecondsLeft, setRideSecondsLeft] = useState(TOTAL_SECONDS);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    setToasts(prev => [...prev, { ...toast, id: Date.now() }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Push notifications on phase changes
  useEffect(() => {
    addToast({ type: "info", title: "Поездка подтверждена", desc: "Артём Ковалёв едет к вам" });
  }, []);

  useEffect(() => {
    if (arrivalSecondsLeft === 30 && phase === "arriving") {
      addToast({ type: "arrival", title: "Водитель почти прибыл", desc: "Toyota Camry · А123МК197 · ~30 сек" });
    }
  }, [arrivalSecondsLeft, phase]);

  // Arrival countdown
  useEffect(() => {
    if (phase !== "arriving") return;
    if (arrivalSecondsLeft <= 0) {
      setPhase("in_ride");
      addToast({ type: "started", title: "Поездка началась!", desc: "Маршрут: Тверская → Шереметьево" });
      return;
    }
    const t = setTimeout(() => setArrivalSecondsLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, arrivalSecondsLeft]);

  // Ride countdown (accelerated 30x for demo)
  useEffect(() => {
    if (phase !== "in_ride") return;
    if (rideSecondsLeft <= 0) { setPhase("done"); return; }
    if (rideSecondsLeft === 5 * 60) {
      addToast({ type: "info", title: "До прибытия 5 минут", desc: "Аэропорт Шереметьево" });
    }
    const t = setTimeout(() => setRideSecondsLeft(p => p - 30), 1000);
    return () => clearTimeout(t);
  }, [phase, rideSecondsLeft]);

  const fmt = (s: number) => {
    const m = Math.floor(Math.max(s, 0) / 60);
    const sec = Math.max(s, 0) % 60;
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  const progress = phase === "arriving"
    ? 1 - arrivalSecondsLeft / ARRIVAL_SECONDS
    : Math.min(1 - rideSecondsLeft / TOTAL_SECONDS, 1);

  // Animated car X position on the road (0..100%)
  const carX = Math.round(progress * 80) + 5;

  const driver = {
    name: "Артём Ковалёв",
    initials: "АК",
    car: "Toyota Camry",
    plate: "А123МК197",
    color: "Серебристый",
    rating: 4.9,
    trips: 1240,
  };

  /* ── DONE phase ── */
  if (phase === "done") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--dark-bg)" }}>
        <RideToast toasts={toasts} onRemove={removeToast} />
        <div className="relative overflow-hidden flex-1 flex flex-col items-center justify-center px-5">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(168,85,247,0.18) 0%, transparent 70%)" }} />

          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Success icon */}
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-5"
              style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)", boxShadow: "0 12px 40px rgba(168,85,247,0.45)" }}>
              <span className="text-5xl">🏁</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "Oswald, sans-serif" }}>
              Поездка завершена!
            </h1>
            <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>Аэропорт Шереметьево</p>

            {/* Trip summary */}
            <div className="w-full rounded-3xl p-5 mt-5 mb-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Время", value: "58 мин", icon: "Clock" },
                  { label: "Расстояние", value: "42 км", icon: "MapPin" },
                  { label: "Стоимость", value: "1 240 ₽", icon: "Wallet" },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <Icon name={s.icon} size={16} style={{ color: "#a855f7", margin: "0 auto 4px" }} />
                    <p className="text-base font-bold text-white">{s.value}</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Driver */}
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid var(--card-border)" }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #00d4ff, #0ea5e9)" }}>
                  {driver.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{driver.name}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{driver.car} · {driver.plate}</p>
                </div>
              </div>
            </div>

            {/* Rating */}
            <p className="text-sm font-semibold text-white mb-3">Оцените водителя</p>
            <div className="flex gap-3 mb-6">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(s)}
                  className="text-4xl transition-all duration-150 active:scale-90"
                  style={{ filter: s <= (hoverRating || rating) ? "none" : "grayscale(1) opacity(0.3)" }}>
                  ⭐
                </button>
              ))}
            </div>

            <button onClick={onFinish}
              className="w-full py-4 rounded-2xl font-bold text-white text-lg tracking-wide transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #00d4ff 100%)",
                boxShadow: "0 8px 32px rgba(168,85,247,0.4)",
                fontFamily: "Oswald, sans-serif",
                letterSpacing: 2,
              }}>
              {rating > 0 ? "ОТПРАВИТЬ ОЦЕНКУ" : "ЗАКРЫТЬ"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── ARRIVING / IN_RIDE phase ── */
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--dark-bg)" }}>
      <RideToast toasts={toasts} onRemove={removeToast} />

      {/* Map area */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: 280 }}>
        {/* Map bg */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #0d1117, #0f1923, #0a0e17)" }}>
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="gridR" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#a855f7" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridR)" />
          </svg>

          {/* Roads */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Main horizontal road */}
            <line x1="0" y1="140" x2="430" y2="140" stroke="rgba(168,85,247,0.35)" strokeWidth="4" />
            {/* Secondary roads */}
            <line x1="0" y1="80" x2="430" y2="200" stroke="rgba(0,212,255,0.2)" strokeWidth="2" />
            <line x1="100" y1="0" x2="100" y2="280" stroke="rgba(0,212,255,0.15)" strokeWidth="1.5" />
            <line x1="300" y1="0" x2="300" y2="280" stroke="rgba(168,85,247,0.15)" strokeWidth="1.5" />

            {/* Route highlight */}
            <line x1="5%" y1="140" x2={`${carX}%`} y2="140"
              stroke="url(#routeGrad)" strokeWidth="5" strokeLinecap="round" />
            <defs>
              <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>
            </defs>

            {/* Origin dot */}
            <circle cx="5%" cy="140" r="6" fill="#a855f7" />

            {/* Destination dot */}
            <circle cx="88%" cy="140" r="7" fill="none" stroke="#00d4ff" strokeWidth="2"
              strokeDasharray={phase === "in_ride" ? "0" : "4 2"} />
            <circle cx="88%" cy="140" r="3" fill="#00d4ff" opacity="0.7" />
          </svg>

          {/* Animated car */}
          <div className="absolute transition-all duration-1000"
            style={{ left: `calc(${carX}% - 18px)`, top: "calc(140px - 18px)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg animate-float"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #0ea5e9)",
                boxShadow: "0 4px 16px rgba(0,212,255,0.6)",
              }}>
              🚗
            </div>
          </div>

          {/* Labels */}
          <div className="absolute px-2 py-1 rounded-lg text-[10px] font-medium"
            style={{ left: "4%", top: 100, background: "rgba(168,85,247,0.2)", color: "#d8b4fe", border: "1px solid rgba(168,85,247,0.3)" }}>
            Тверская, 18
          </div>
          <div className="absolute px-2 py-1 rounded-lg text-[10px] font-medium"
            style={{ right: "4%", top: 100, background: "rgba(0,212,255,0.15)", color: "#7dd3fc", border: "1px solid rgba(0,212,255,0.3)" }}>
            Шереметьево
          </div>
        </div>

        {/* Top status pill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="px-4 py-2 rounded-2xl flex items-center gap-2"
            style={{
              background: "rgba(10,11,15,0.85)",
              backdropFilter: "blur(16px)",
              border: phase === "arriving"
                ? "1px solid rgba(245,158,11,0.4)"
                : "1px solid rgba(0,212,255,0.4)",
            }}>
            <div className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: phase === "arriving" ? "#f59e0b" : "#00d4ff" }} />
            <span className="text-sm font-semibold"
              style={{ color: phase === "arriving" ? "#fbbf24" : "#00d4ff" }}>
              {phase === "arriving" ? "Водитель едет к вам" : "В пути"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="flex-1 -mt-5 relative z-10 rounded-t-[28px] overflow-hidden flex flex-col"
        style={{ background: "var(--dark-bg)", borderTop: "1px solid var(--card-border)" }}>

        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
        </div>

        <div className="px-5 flex-1 overflow-y-auto">

          {/* Timer + Progress */}
          <div className="mb-5">
            <div className="flex items-end justify-between mb-2">
              <div>
                <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {phase === "arriving" ? "Водитель прибудет через" : "До прибытия"}
                </p>
                <p className="text-4xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
                  {phase === "arriving" ? fmt(arrivalSecondsLeft) : fmt(rideSecondsLeft)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Маршрут</p>
                <p className="text-sm font-semibold text-white">42 км</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--card-border)" }}>
              <div className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.round(progress * 100)}%`,
                  background: "linear-gradient(to right, #a855f7, #6366f1, #00d4ff)",
                  boxShadow: "0 0 8px rgba(168,85,247,0.6)",
                }} />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>Тверская, 18</span>
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>Шереметьево</span>
            </div>
          </div>

          {/* Driver card */}
          <div className="rounded-3xl p-4 mb-4"
            style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold"
                style={{ background: "linear-gradient(135deg, #00d4ff, #0ea5e9)", boxShadow: "0 4px 16px rgba(0,212,255,0.35)" }}>
                {driver.initials}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">{driver.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs">⭐ {driver.rating}</span>
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 10 }}>·</span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{driver.trips} поездок</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={onChat}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90"
                  style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}>
                  <Icon name="MessageCircle" size={17} style={{ color: "#a855f7" }} />
                </button>
                <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90"
                  style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)" }}>
                  <Icon name="Phone" size={17} style={{ color: "#00d4ff" }} />
                </button>
              </div>
            </div>

            {/* Car info */}
            <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid var(--card-border)" }}>
              <span className="text-xl">🚗</span>
              <div>
                <p className="text-sm font-semibold text-white">{driver.car} · {driver.color}</p>
                <p className="text-xs font-mono" style={{ color: "#00d4ff" }}>{driver.plate}</p>
              </div>
              <div className="ml-auto px-3 py-1 rounded-xl"
                style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>
                <span className="text-xs font-semibold" style={{ color: "#7dd3fc" }}>Комфорт</span>
              </div>
            </div>
          </div>

          {/* Push notifications row */}
          <div className="flex gap-2 mb-5">
            {[
              { icon: "Bell", label: "Уведомления вкл.", color: "#a855f7" },
              { icon: "Shield", label: "SOS", color: "#f87171" },
              { icon: "Share2", label: "Поделиться", color: "#00d4ff" },
            ].map(action => (
              <button key={action.label}
                className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl transition-all active:scale-95"
                style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                <Icon name={action.icon} size={17} style={{ color: action.color }} />
                <span className="text-[10px] text-center leading-tight" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {action.label}
                </span>
              </button>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between px-4 py-3 rounded-2xl mb-5"
            style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}>
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Стоимость поездки</span>
            <span className="text-xl font-bold text-white" style={{ fontFamily: "Oswald" }}>1 240 ₽</span>
          </div>

          {/* Cancel */}
          <button className="w-full py-3.5 rounded-2xl text-sm font-semibold mb-2 transition-all active:scale-95"
            style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)", color: "#f87171" }}>
            Отменить поездку
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveRideScreen;