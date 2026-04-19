import { useState } from "react";
import HomeScreen from "@/components/screens/HomeScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import HistoryScreen from "@/components/screens/HistoryScreen";
import ChatScreen from "@/components/screens/ChatScreen";
import BottomNav from "@/components/BottomNav";

type Screen = "home" | "history" | "chat" | "profile";

const Index = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>("home");

  const renderScreen = () => {
    switch (activeScreen) {
      case "home": return <HomeScreen />;
      case "history": return <HistoryScreen />;
      case "chat": return <ChatScreen />;
      case "profile": return <ProfileScreen />;
    }
  };

  return (
    <div className="app-container">
      <div className="pb-20">
        {renderScreen()}
      </div>
      <BottomNav active={activeScreen} onNavigate={(s) => setActiveScreen(s as Screen)} />
    </div>
  );
};

export default Index;
