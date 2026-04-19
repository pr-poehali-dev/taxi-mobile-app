import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  text: string;
  sender: "user" | "driver";
  time: string;
  read?: boolean;
}

const initialMessages: Message[] = [
  { id: 1, text: "Здравствуйте! Буду через 3 минуты, стою у главного входа 🚗", sender: "driver", time: "14:28" },
  { id: 2, text: "Хорошо, спасибо! Я выхожу", sender: "user", time: "14:28", read: true },
  { id: 3, text: "Отлично! Я на серебристой Toyota Camry, номер А123МК197", sender: "driver", time: "14:29" },
  { id: 4, text: "Вижу вас, иду!", sender: "user", time: "14:30", read: true },
  { id: 5, text: "Принял, жду 👍", sender: "driver", time: "14:30" },
];

const quickReplies = [
  "Иду к вам 👋",
  "Буду через 2 мин",
  "Я у входа",
  "Спасибо!",
];

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: "user", time, read: false }]);
    setInput("");

    // Driver auto-reply
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: "Понял, буду готов! 👌",
        sender: "driver",
        time,
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--dark-bg)" }}>
      {/* Header */}
      <div
        className="px-5 pt-14 pb-4 relative z-10"
        style={{
          background: "rgba(10,11,15,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--card-border)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-lg font-bold"
              style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)" }}
            >
              АК
            </div>
            <div
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
              style={{ background: "#22d3ee", borderColor: "var(--dark-bg)" }}
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white text-sm">Артём Ковалёв</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22d3ee" }} />
              <p className="text-xs" style={{ color: "#22d3ee" }}>В пути · 2 мин</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}
            >
              <Icon name="Phone" size={16} style={{ color: "#a855f7" }} />
            </button>
            <button
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}
            >
              <Icon name="MapPin" size={16} style={{ color: "#00d4ff" }} />
            </button>
          </div>
        </div>

        {/* Trip info */}
        <div
          className="mt-3 px-3 py-2 rounded-xl flex items-center justify-between"
          style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.15)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Toyota Camry</span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 10 }}>•</span>
            <span className="text-xs font-semibold" style={{ color: "#d8b4fe" }}>А123МК197</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs">⭐</span>
            <span className="text-xs font-semibold text-white">4.9</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            {msg.sender === "driver" && (
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold mr-2 mt-auto flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)" }}
              >
                АК
              </div>
            )}
            <div
              className="max-w-[75%] px-4 py-3 rounded-2xl"
              style={msg.sender === "user" ? {
                background: "linear-gradient(135deg, #a855f7, #6366f1)",
                borderBottomRightRadius: 6,
              } : {
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderBottomLeftRadius: 6,
              }}
            >
              <p className="text-sm text-white leading-relaxed">{msg.text}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[10px]" style={{ color: msg.sender === "user" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)" }}>
                  {msg.time}
                </span>
                {msg.sender === "user" && (
                  <Icon name={msg.read ? "CheckCheck" : "Check"} size={12} style={{ color: msg.read ? "#00d4ff" : "rgba(255,255,255,0.4)" }} />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      <div className="px-5 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => sendMessage(reply)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all active:scale-95"
              style={{
                background: "rgba(168,85,247,0.1)",
                border: "1px solid rgba(168,85,247,0.25)",
                color: "#d8b4fe",
              }}
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div
        className="px-5 pb-5 pt-3"
        style={{ background: "rgba(10,11,15,0.95)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Сообщение водителю..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-600 text-white"
            />
            <button>
              <Icon name="Smile" size={18} style={{ color: "rgba(255,255,255,0.3)" }} />
            </button>
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all active:scale-95"
            style={{
              background: input.trim()
                ? "linear-gradient(135deg, #a855f7, #6366f1)"
                : "var(--card-bg)",
              border: input.trim() ? "none" : "1px solid var(--card-border)",
              boxShadow: input.trim() ? "0 4px 15px rgba(168,85,247,0.4)" : "none",
            }}
          >
            <Icon name="Send" size={18} style={{ color: input.trim() ? "white" : "rgba(255,255,255,0.3)" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
