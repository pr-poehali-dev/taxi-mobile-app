import Icon from "@/components/ui/icon";

type Screen = "home" | "history" | "chat" | "profile";

interface Props {
  active: Screen;
  onNavigate: (screen: string) => void;
}

const tabs: { id: Screen; icon: string; label: string }[] = [
  { id: "home", icon: "MapPin", label: "Главная" },
  { id: "history", icon: "Clock", label: "Поездки" },
  { id: "chat", icon: "MessageCircle", label: "Чат" },
  { id: "profile", icon: "User", label: "Профиль" },
];

const BottomNav = ({ active, onNavigate }: Props) => {
  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50"
      style={{
        background: "rgba(10,11,15,0.95)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300"
              style={isActive ? {
                background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(0,212,255,0.15))",
                border: "1px solid rgba(168,85,247,0.3)",
              } : {}}
            >
              <div
                className="transition-all duration-300"
                style={{ color: isActive ? "#a855f7" : "rgba(255,255,255,0.35)" }}
              >
                <Icon name={tab.icon} size={22} />
              </div>
              <span
                className="text-[10px] font-medium tracking-wide transition-all duration-300"
                style={{ color: isActive ? "#a855f7" : "rgba(255,255,255,0.35)" }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
