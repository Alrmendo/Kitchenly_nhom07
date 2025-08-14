import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/home/HomePage";
import { ManageIngredientsPage } from "./components/manage_ingredients";
import { AddIngredientsPage } from "./components/manage_ingredients/add_ingredients";
import { EditIngredientPage } from "./components/manage_ingredients/edit_ingredient";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage activeTab={activeTab} onTabChange={handleTabChange} />} />
        <Route path="/manage-ingredients">
          <Route index element={<ManageIngredientsPage />} />
          <Route path="add-ingredients" element={<AddIngredientsPage />} />
          <Route path="edit-ingredient/:index" element={<EditIngredientPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
