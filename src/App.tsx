import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddIngredientsPage } from "./components/add_ingredients";
import { HomePage } from "./components/home/HomePage";
import { ManageIngredientsPage } from "./components/manage_ingredients";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage activeTab={activeTab} onTabChange={handleTabChange} />} />
        <Route path="/manage-ingredients" element={<ManageIngredientsPage />} />
        <Route path="/add-ingredients" element={<AddIngredientsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
