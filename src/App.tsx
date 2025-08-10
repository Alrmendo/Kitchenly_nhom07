import "./App.css";
import { useState } from "react";
import { HomePage } from "./components/home/HomePage";
import { CookingMode } from "./components";

function App() {
  const [currentView, setCurrentView] = useState<"home" | "cooking">("home");

  if (currentView === "cooking") {
    return <CookingMode onNavigateBack={() => setCurrentView("home")} />;
  }

  return <HomePage onNavigateToCooking={() => setCurrentView("cooking")} />;
}

export default App;