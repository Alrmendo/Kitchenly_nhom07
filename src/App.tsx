import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./components/home/HomePage";
import OnboardingPage from "./pages/onboarding-v2";
import { ManageIngredientsPage } from "./components/manage_ingredients";
import { AddIngredientsPage } from "./components/manage_ingredients/add_ingredients";
import { EditIngredientPage } from "./components/manage_ingredients/edit_ingredient";
import { CookingMode } from "./components/cooking-mode";

/**
 * A component for handling undefined routes (404 Not Found).
 * @returns {JSX.Element} The NotFoundPage component.
 */
const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">404 - Page Not Found</h2>
    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
      The page you are looking for does not exist.
    </p>
    <Link to="/" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center font-sans">
        {/* Page Content */}
        <main className="w-full max-w-md min-h-[600px] max-h-[100vh] h-[calc(100vh-4px)] py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl max-w-full h-full">
            {/* Routes and Route components define the mapping between URL paths and components */}
            <Routes>
              <Route path="/" element={<OnboardingPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/home" element={<HomePage activeTab={activeTab} onTabChange={handleTabChange} />} />
              <Route path="/cooking" element={<CookingMode />} />
              <Route path="/manage-ingredients">
                <Route index element={<ManageIngredientsPage />} />
                <Route path="add-ingredients" element={<AddIngredientsPage />} />
                <Route path="edit-ingredient/:index" element={<EditIngredientPage />} />
              </Route>
              {/* This route acts as a catch-all for any other path */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        {/* <footer className="bg-white dark:bg-gray-800 shadow-lg mt-8">
          <div className="container">
            <BottomNavigation 
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </footer> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
