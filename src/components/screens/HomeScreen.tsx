import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  onStartRide: () => void;
}

const HomeScreen = ({ onStartRide }: Props) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searching, setSearching] = useState(false);

  const quickDestinations = [
    { name: "Офис", icon: "Briefcase", distance: "3.2 км" },
    { name: "Дом", icon: "Home", distance: "8.7 км" },
    { name: "Аэропорт", icon: "Plane", distance: "42 км" },
    { name: "Торговый центр", icon: "ShoppingBag", distance: "5.1 км" },
  ];

  const rideTypes = [
    { id: "economy", name: "Эконом", price: "от 180 ₽", time: "3 мин", emoji: "🚗" },
    { id: "delivery", name: "Доставка", price: "от 250 ₽", time: "5 мин", emoji: "📦" },
    { id: "cargo", name: "Грузовой", price: "от 600 ₽", time: "10 мин", emoji: "🚛" },
  ];

  const [selectedRide, setSelectedRide] = useState("economy");

  const handleSearch = () => {
    setSearching(true);
    // Simulate finding driver (2s)
    setTimeout(() => {
      setSearching(false);
      onStartRide();
    }, 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      <div className="relative overflow-hidden" style={{ paddingTop: "env(safe-area-inset-top, 12px)" }}>
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)", transform: "translate(30%, -30%)" }} />
        <div className="absolute top-20 left-0 w-48 h-48 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #00d4ff, transparent)", transform: "translate(-30%, 0%)" }} />

        <div className="px-5 pt-6 pb-4 relative z-10">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Добрый день 👋</p>
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
                Куда едем?
              </h1>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                <Icon name="Bell" size={18} style={{ color: "rgba(255,255,255,0.7)" }} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2"
                style={{ background: "#a855f7", borderColor: "var(--dark-bg)" }} />
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mx-5 rounded-3xl overflow-hidden mb-5 relative" style={{ height: 200 }}>
          <div className="w-full h-full"
            style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f1923 50%, #0d1117 100%)", position: "relative" }}>
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#a855f7" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <svg className="absolute inset-0 w-full h-full">
              <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(168,85,247,0.4)" strokeWidth="3" />
              <line x1="150" y1="0" x2="150" y2="200" stroke="rgba(0,212,255,0.3)" strokeWidth="2" />
              <line x1="0" y1="60" x2="400" y2="150" stroke="rgba(244,114,182,0.2)" strokeWidth="1.5" />
            </svg>
            <div className="absolute" style={{ top: "45%", left: "40%", transform: "translate(-50%,-50%)" }}>
              <div className="relative">
                <div className="w-5 h-5 rounded-full animate-pulse"
                  style={{ background: "#a855f7", boxShadow: "0 0 20px rgba(168,85,247,0.8)" }} />
                <div className="absolute -inset-3 rounded-full opacity-30 animate-ping"
                  style={{ background: "#a855f7" }} />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl text-xs font-medium"
              style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.3)", color: "#d8b4fe" }}>
              📍 Москва, Тверская ул.
            </div>
          </div>
        </div>

        {/* Route Input */}
        <div className="mx-5 mb-5">
          <div className="rounded-3xl p-4 space-y-3"
            style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(168,85,247,0.15)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: "#a855f7" }} />
              </div>
              <input value={from} onChange={(e) => setFrom(e.target.value)}
                placeholder="Откуда едете..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-600"
                style={{ color: "rgba(255,255,255,0.9)" }} />
            </div>
            <div style={{ height: 1, background: "var(--card-border)", marginLeft: 44 }} />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,212,255,0.15)" }}>
                <Icon name="MapPin" size={14} style={{ color: "#00d4ff" }} />
              </div>
              <input value={to} onChange={(e) => setTo(e.target.value)}
                placeholder="Куда едете..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-600"
                style={{ color: "rgba(255,255,255,0.9)" }} />
            </div>
          </div>
        </div>

        {/* Quick destinations */}
        <div className="px-5 mb-5">
          <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
            Быстрый выбор
          </p>
          <div className="grid grid-cols-2 gap-2">
            {quickDestinations.map((dest) => (
              <button key={dest.name}
                className="flex items-center gap-3 p-3 rounded-2xl text-left transition-all active:scale-95"
                style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
                onClick={() => setTo(dest.name)}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(168,85,247,0.12)" }}>
                  <Icon name={dest.icon} size={15} style={{ color: "#a855f7" }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{dest.name}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{dest.distance}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Ride types */}
        <div className="px-5 mb-5">
          <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
            Тип поездки
          </p>
          <div className="flex gap-2">
            {rideTypes.map((ride) => (
              <button key={ride.id} onClick={() => setSelectedRide(ride.id)}
                className="flex-1 p-3 rounded-2xl transition-all duration-200 active:scale-95"
                style={selectedRide === ride.id ? {
                  background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(0,212,255,0.15))",
                  border: "1px solid rgba(168,85,247,0.5)",
                } : {
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                }}>
                <div className="text-2xl mb-1 text-center">{ride.emoji}</div>
                <p className="text-xs font-semibold text-white text-center">{ride.name}</p>
                <p className="text-xs mt-0.5 text-center"
                  style={{ color: selectedRide === ride.id ? "#a855f7" : "rgba(255,255,255,0.4)" }}>
                  {ride.price}
                </p>
                <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>{ride.time}</p>
              </button>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="px-5 mb-6">
          <button onClick={handleSearch} disabled={searching}
            className="w-full py-4 rounded-2xl font-bold text-white text-lg tracking-wide transition-all duration-200 active:scale-95 flex items-center justify-center gap-3"
            style={{
              background: searching
                ? "linear-gradient(135deg, #6b21a8, #4338ca)"
                : "linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #00d4ff 100%)",
              boxShadow: "0 8px 32px rgba(168,85,247,0.4)",
              fontFamily: "Oswald, sans-serif",
              letterSpacing: 2,
            }}>
            {searching ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                ИЩЕМ ВОДИТЕЛЯ...
              </>
            ) : "НАЙТИ ВОДИТЕЛЯ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;