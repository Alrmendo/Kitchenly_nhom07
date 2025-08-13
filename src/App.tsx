import { useState } from "react";
import { HomePage } from "./components/home/HomePage";
import { ManageIngredientsPage } from "./components/manage_ingredients";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleNavigateBack = () => {
    setActiveTab("home");
  };

  const renderCurrentPage = () => {
    switch (activeTab) {
      case "fridge":
        return <ManageIngredientsPage activeTab={activeTab} onTabChange={handleTabChange} onNavigateBack={handleNavigateBack} />;
      case "home":
      default:
        return <HomePage activeTab={activeTab} onTabChange={handleTabChange} />;
    }
  };

  return renderCurrentPage();
}

export default App;
