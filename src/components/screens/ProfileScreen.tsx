import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  onBack?: () => void;
}

const reviews = [
  { id: 1, driver: "Артём К.", rating: 5, text: "Отличный пассажир, всё чётко!", date: "19 апр", avatar: "АК" },
  { id: 2, driver: "Михаил Р.", rating: 5, text: "Вовремя вышел, приятно общаться", date: "18 апр", avatar: "МР" },
  { id: 3, driver: "Дмитрий П.", rating: 4, text: "Хороший пассажир, рекомендую", date: "17 апр", avatar: "ДП" },
];

const achievements = [
  { icon: "🏆", label: "100+ поездок", unlocked: true },
  { icon: "⭐", label: "Рейтинг 4.9+", unlocked: true },
  { icon: "🌙", label: "Ночной ездок", unlocked: true },
  { icon: "🚀", label: "Постоянный", unlocked: false },
];

const settings = [
  { icon: "Bell", label: "Уведомления", value: true, type: "toggle" },
  { icon: "MapPin", label: "Геолокация", value: true, type: "toggle" },
  { icon: "Shield", label: "Безопасность", type: "link" },
  { icon: "CreditCard", label: "Способ оплаты", desc: "Visa •••• 4242", type: "link" },
  { icon: "HelpCircle", label: "Поддержка", type: "link" },
];

const ProfileScreen = ({ onBack }: Props) => {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    Bell: true,
    MapPin: true,
  });

  const toggle = (key: string) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, rgba(168,85,247,0.25) 0%, rgba(99,102,241,0.15) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #f472b6, transparent)", transform: "translate(30%, -30%)" }}
        />

        <div className="relative z-10 px-5 pt-14 pb-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center text-2xl font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #00d4ff 100%)",
                  boxShadow: "0 8px 32px rgba(168,85,247,0.4)",
                }}
              >
                АС
              </div>
              <button
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: "#1e2130", border: "1px solid var(--card-border)" }}
              >
                <Icon name="Camera" size={12} style={{ color: "rgba(255,255,255,0.6)" }} />
              </button>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
                Алексей Смирнов
              </h2>
              <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>+7 (916) 234-56-78</p>
              <div className="flex items-center gap-2 mt-2">
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-lg"
                  style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}
                >
                  <span className="text-xs">⭐</span>
                  <span className="text-xs font-bold" style={{ color: "#f59e0b" }}>4.9</span>
                </div>
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-lg"
                  style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.25)" }}
                >
                  <Icon name="Car" size={11} style={{ color: "#a855f7" }} />
                  <span className="text-xs font-semibold" style={{ color: "#d8b4fe" }}>147 поездок</span>
                </div>
              </div>
            </div>
          </div>

          {/* Balance card */}
          <div
            className="mt-4 p-4 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(0,212,255,0.1))",
              border: "1px solid rgba(168,85,247,0.25)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Баланс</p>
                <p className="text-2xl font-bold text-white mt-0.5" style={{ fontFamily: "Oswald, sans-serif" }}>
                  1 240 ₽
                </p>
              </div>
              <button
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)" }}
              >
                Пополнить
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="px-5 mb-5">
        <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
          Достижения
        </p>
        <div className="flex gap-2">
          {achievements.map((ach) => (
            <div
              key={ach.label}
              className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl"
              style={{
                background: ach.unlocked ? "rgba(168,85,247,0.1)" : "var(--card-bg)",
                border: ach.unlocked ? "1px solid rgba(168,85,247,0.3)" : "1px solid var(--card-border)",
                opacity: ach.unlocked ? 1 : 0.4,
              }}
            >
              <span className="text-2xl">{ach.icon}</span>
              <p className="text-[9px] text-center font-medium" style={{ color: ach.unlocked ? "#d8b4fe" : "rgba(255,255,255,0.4)" }}>
                {ach.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
            Отзывы водителей
          </p>
          <button className="text-xs" style={{ color: "#a855f7" }}>Все →</button>
        </div>
        <div className="space-y-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 rounded-2xl"
              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)" }}
                >
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{review.driver}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{review.date}</p>
                  </div>
                  <div className="flex gap-0.5 my-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-xs" style={{ opacity: i < review.rating ? 1 : 0.2 }}>⭐</span>
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="px-5 mb-6">
        <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
          Настройки
        </p>
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
        >
          {settings.map((setting, idx) => (
            <div key={setting.label}>
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(168,85,247,0.1)" }}
                >
                  <Icon name={setting.icon} size={16} style={{ color: "#a855f7" }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{setting.label}</p>
                  {setting.desc && (
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{setting.desc}</p>
                  )}
                </div>
                {setting.type === "toggle" ? (
                  <button
                    onClick={() => toggle(setting.icon)}
                    className="relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0"
                    style={{
                      background: toggles[setting.icon]
                        ? "linear-gradient(135deg, #a855f7, #6366f1)"
                        : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
                      style={{ left: toggles[setting.icon] ? "calc(100% - 22px)" : "2px" }}
                    />
                  </button>
                ) : (
                  <Icon name="ChevronRight" size={16} style={{ color: "rgba(255,255,255,0.25)" }} />
                )}
              </div>
              {idx < settings.length - 1 && (
                <div style={{ height: 1, background: "var(--card-border)", marginLeft: 56 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-5 mb-6 space-y-3">
        {onBack && (
          <button
            onClick={onBack}
            className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
            style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)", color: "#d8b4fe" }}
          >
            <Icon name="ArrowLeft" size={15} />
            Выйти из профиля
          </button>
        )}
        <button
          className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-all active:scale-95"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;