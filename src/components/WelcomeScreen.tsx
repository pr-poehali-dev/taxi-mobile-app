import Icon from "@/components/ui/icon";

type Role = "passenger" | "driver" | "admin";

interface Props {
  onSelect: (role: Role) => void;
}

const roles = [
  {
    id: "passenger" as Role,
    title: "Пассажир",
    desc: "Заказывайте поездки, следите за маршрутом и общайтесь с водителем",
    icon: "User",
    emoji: "🧳",
    gradient: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
    glow: "rgba(168,85,247,0.35)",
    border: "rgba(168,85,247,0.4)",
  },
  {
    id: "driver" as Role,
    title: "Водитель",
    desc: "Принимайте заказы, управляйте своим статусом и зарабатывайте",
    icon: "Car",
    emoji: "🚗",
    gradient: "linear-gradient(135deg, #00d4ff 0%, #0ea5e9 100%)",
    glow: "rgba(0,212,255,0.35)",
    border: "rgba(0,212,255,0.4)",
  },
  {
    id: "admin" as Role,
    title: "Администратор",
    desc: "Управляйте водителями, заказами, тарифами и аналитикой платформы",
    icon: "Shield",
    emoji: "⚡",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f472b6 100%)",
    glow: "rgba(245,158,11,0.35)",
    border: "rgba(245,158,11,0.4)",
  },
];

const WelcomeScreen = ({ onSelect }: Props) => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--dark-bg)" }}>
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)", top: "-10%", right: "-20%", filter: "blur(40px)" }} />
        <div className="absolute w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #00d4ff, transparent)", bottom: "20%", left: "-15%", filter: "blur(40px)" }} />
        <div className="absolute w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #f59e0b, transparent)", bottom: "-5%", right: "10%", filter: "blur(30px)" }} />
      </div>

      <div className="relative z-10 flex flex-col flex-1 px-5 pt-16 pb-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10 animate-fade-in">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, #a855f7, #6366f1, #00d4ff)",
              boxShadow: "0 12px 40px rgba(168,85,247,0.45)",
            }}
          >
            <span className="text-4xl">🚀</span>
          </div>
          <h1
            className="text-4xl font-bold text-white tracking-widest"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            RIDEX
          </h1>
          <p className="text-sm mt-2 text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
            Выберите профиль для входа
          </p>
        </div>

        {/* Role cards */}
        <div className="flex flex-col gap-4 flex-1 justify-center">
          {roles.map((role, idx) => (
            <button
              key={role.id}
              onClick={() => onSelect(role.id)}
              className="w-full text-left transition-all duration-200 active:scale-[0.97] animate-slide-up"
              style={{ animationDelay: `${idx * 0.1 + 0.1}s`, opacity: 0, animationFillMode: "forwards" }}
            >
              <div
                className="p-5 rounded-3xl flex items-center gap-4"
                style={{
                  background: "var(--card-bg)",
                  border: `1px solid ${role.border}`,
                  boxShadow: `0 4px 24px ${role.glow}`,
                }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
                  style={{ background: role.gradient, boxShadow: `0 6px 20px ${role.glow}` }}
                >
                  {role.emoji}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "Oswald, sans-serif", letterSpacing: 1 }}
                  >
                    {role.title}
                  </p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {role.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <Icon name="ChevronRight" size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-xs mt-8" style={{ color: "rgba(255,255,255,0.2)" }}>
          RideX v1.0 · Демо-версия
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
