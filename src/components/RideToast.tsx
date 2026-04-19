import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

export interface Toast {
  id: number;
  type: "arrival" | "started" | "info" | "warning";
  title: string;
  desc?: string;
}

interface Props {
  toasts: Toast[];
  onRemove: (id: number) => void;
}

const toastMeta = {
  arrival: { icon: "Car", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.35)" },
  started: { icon: "Navigation", color: "#00d4ff", bg: "rgba(0,212,255,0.12)", border: "rgba(0,212,255,0.35)" },
  info:    { icon: "Bell", color: "#a855f7", bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.35)" },
  warning: { icon: "AlertCircle", color: "#f87171", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.35)" },
};

const ToastItem = ({ toast, onRemove }: { toast: Toast; onRemove: () => void }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 10);
    const t2 = setTimeout(() => { setVisible(false); setTimeout(onRemove, 350); }, 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const meta = toastMeta[toast.type];

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300"
      style={{
        background: meta.bg,
        border: `1px solid ${meta.border}`,
        backdropFilter: "blur(20px)",
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${meta.border}`,
        transform: visible ? "translateY(0) scale(1)" : "translateY(-16px) scale(0.95)",
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${meta.color}20` }}>
        <Icon name={meta.icon} size={18} style={{ color: meta.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white leading-tight">{toast.title}</p>
        {toast.desc && (
          <p className="text-xs mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.5)" }}>{toast.desc}</p>
        )}
      </div>
      <button onClick={() => { setVisible(false); setTimeout(onRemove, 350); }}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg transition-all active:scale-90"
        style={{ background: "rgba(255,255,255,0.06)" }}>
        <Icon name="X" size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
      </button>
    </div>
  );
};

const RideToast = ({ toasts, onRemove }: Props) => {
  if (!toasts.length) return null;
  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 w-full max-w-[400px] px-4 z-[100] space-y-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem toast={t} onRemove={() => onRemove(t.id)} />
        </div>
      ))}
    </div>
  );
};

export default RideToast;
