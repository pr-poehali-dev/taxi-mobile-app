import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import BottomNav from "@/components/BottomNav";

// Passenger screens
import HomeScreen from "@/components/screens/HomeScreen";
import HistoryScreen from "@/components/screens/HistoryScreen";
import ChatScreen from "@/components/screens/ChatScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";

// Driver screens
import DriverHomeScreen from "@/components/screens/driver/DriverHomeScreen";
import DriverOrdersScreen from "@/components/screens/driver/DriverOrdersScreen";
import DriverEarningsScreen from "@/components/screens/driver/DriverEarningsScreen";
import DriverProfileScreen from "@/components/screens/driver/DriverProfileScreen";

// Admin screens
import AdminDashboardScreen from "@/components/screens/admin/AdminDashboardScreen";
import AdminDriversScreen from "@/components/screens/admin/AdminDriversScreen";
import AdminOrdersScreen from "@/components/screens/admin/AdminOrdersScreen";
import AdminTariffsScreen from "@/components/screens/admin/AdminTariffsScreen";

export type Role = "passenger" | "driver" | "admin";

export interface CarCard {
  brand: string;
  model: string;
  year: string;
  plate: string;
  color: string;
  category: string;
}

const passengerTabs = [
  { id: "home", icon: "MapPin", label: "Главная" },
  { id: "history", icon: "Clock", label: "Поездки" },
  { id: "chat", icon: "MessageCircle", label: "Чат" },
  { id: "profile", icon: "User", label: "Профиль" },
];

const driverTabs = [
  { id: "home", icon: "Navigation", label: "Онлайн" },
  { id: "orders", icon: "List", label: "Заказы" },
  { id: "earnings", icon: "Wallet", label: "Заработок" },
  { id: "profile", icon: "User", label: "Профиль" },
];

const adminTabs = [
  { id: "dashboard", icon: "LayoutDashboard", label: "Обзор" },
  { id: "drivers", icon: "Car", label: "Водители" },
  { id: "orders", icon: "ClipboardList", label: "Заказы" },
  { id: "tariffs", icon: "Settings", label: "Тарифы" },
];

const Index = () => {
  const [role, setRole] = useState<Role | null>(null);
  const [activeScreen, setActiveScreen] = useState("home");
  const [carCard, setCarCard] = useState<CarCard | null>(null);

  const handleRoleSelect = (r: Role) => {
    setRole(r);
    setCarCard(null);
    setActiveScreen(r === "admin" ? "dashboard" : "home");
  };

  const handleBack = () => {
    setRole(null);
    setActiveScreen("home");
  };

  if (!role) {
    return <div className="app-container"><WelcomeScreen onSelect={handleRoleSelect} /></div>;
  }

  const tabs = role === "passenger" ? passengerTabs : role === "driver" ? driverTabs : adminTabs;

  const renderScreen = () => {
    if (role === "passenger") {
      switch (activeScreen) {
        case "home": return <HomeScreen />;
        case "history": return <HistoryScreen />;
        case "chat": return <ChatScreen />;
        case "profile": return <ProfileScreen onBack={handleBack} />;
      }
    }
    if (role === "driver") {
      switch (activeScreen) {
        case "home": return <DriverHomeScreen carCard={carCard} onGoToProfile={() => setActiveScreen("profile")} />;
        case "orders": return <DriverOrdersScreen />;
        case "earnings": return <DriverEarningsScreen />;
        case "profile": return <DriverProfileScreen onBack={handleBack} carCard={carCard} onCarSave={setCarCard} />;
      }
    }
    if (role === "admin") {
      switch (activeScreen) {
        case "dashboard": return <AdminDashboardScreen />;
        case "drivers": return <AdminDriversScreen />;
        case "orders": return <AdminOrdersScreen />;
        case "tariffs": return <AdminTariffsScreen />;
      }
    }
    return null;
  };

  const accentColor = role === "passenger" ? "#a855f7" : role === "driver" ? "#00d4ff" : "#f59e0b";

  return (
    <div className="app-container">
      <div className="pb-20">{renderScreen()}</div>
      <BottomNav
        active={activeScreen}
        tabs={tabs}
        accentColor={accentColor}
        onNavigate={setActiveScreen}
      />
    </div>
  );
};

export default Index;
