import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { CookingMode } from "./components/cooking-mode";
import { HomePage } from "./components/home/HomePage";
import { ManageIngredientsPage } from "./components/manage_ingredients";
import { AddIngredientsPage } from "./components/manage_ingredients/add_ingredients";
import { EditIngredientPage } from "./components/manage_ingredients/edit_ingredient";
import { CookingMode } from "./components/cooking-mode";
import ShoppingListPage from "./components/shopping_list/ShoppingListPage";
import EditItemPage from "./components/shopping_list/EditItemPage";
import AddItemPage from "./components/shopping_list/AddItemPage";
import { WeeklyMenuDemo } from "./components/weekly-menu-planner";
import OnboardingPage from "./pages/onboarding-v2";

/**
 * A component for handling undefined routes (404 Not Found).
 * @returns {JSX.Element} The NotFoundPage component.
 */
const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
    <h2 className="text-4xl font-bold text-gray-900">404 - Page Not Found</h2>
    <p className="max-w-md text-lg text-gray-600">The page you are looking for does not exist.</p>
    <Link to="/" className="font-medium text-blue-600 hover:underline">
      Go back to Home
    </Link>
  </div>
);

/**
 * The main application component using react-router-dom for navigation.
 * @returns {JSX.Element} The App component.
 */
function App() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <BrowserRouter>
            <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/home" element={<HomePage activeTab={activeTab} onTabChange={handleTabChange} />} />
        <Route path="/cooking" element={<CookingMode />} />
        <Route path="/weekly-menu" element={<WeeklyMenuDemo />} />
        <Route path="/manage-ingredients">
          <Route index element={<ManageIngredientsPage />} />
          <Route path="add-ingredients" element={<AddIngredientsPage />} />
          <Route path="edit-ingredient/:index" element={<EditIngredientPage />} />
        </Route>
        {/* This route acts as a catch-all for any other path */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
              <Route path="/shop">
                <Route index element={<ShoppingListPage />} />
                <Route path="add" element={<AddItemPage />} />
                <Route path="edit" element={<EditItemPage />} />
              </Route>
                            {/* <Route path="/shopping" element={<ShoppingListPage />} /> */}

              {/* This route acts as a catch-all for any other path */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

    </BrowserRouter>
  );
}

export default App;
