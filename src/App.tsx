import { useState } from "react";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/use-auth";
import { CookingMode } from "./components/cooking-mode";
import { HomePage, FoodSuggestionsPage, NotificationsHomePage, TiramisuRecipePage, ViewAllPage, IngredientSuggestionsAllPage, WeeklyHotDishAllPage, SeasonalDishesAllPage, FavoriteDishesAllPage } from "./components/home";
import { ManageIngredientsPage } from "./components/manage_ingredients";
import { AddIngredientsPage } from "./components/manage_ingredients/add_ingredients";
import { EditIngredientPage } from "./components/manage_ingredients/edit_ingredient";
import ShoppingListPage from "./components/shopping_list/ShoppingListPage";
import EditItemPage from "./components/shopping_list/EditItemPage";
import AddItemPage from "./components/shopping_list/AddItemPage";
import { WeeklyMenuDemo } from "./components/weekly-menu-planner";
import UserPersonalizationPage from "./pages/onboarding-v2";
import OnboardingPage from "./pages/onboarding-new";
import OnboardingPage2 from "./pages/onboarding-new-2";
import SettingsPage from "./components/setting/setting";
import NotificationSettings from "./components/setting/notification";
import FAQPage from "./components/setting/help";
import { LoginPage, RegisterPage, WelcomePage } from "./components/auth";

import WeeklyPlannerPage from "./pages/weekly-planner";
import WeeklyPlannerPreferencesPage from "./pages/weekly-planner/preferences";
import RecipeEditorPage from "./pages/weekly-planner/recipe-editor";

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
function AppRoutes() {
  const [activeTab, setActiveTab] = useState("home");
  const { isAuthenticated, isOnboardingCompleted } = useAuth();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const getHomeRoute = () => {
    // First check if user needs onboarding intro (regardless of auth status)
    if (!isOnboardingCompleted) {
      return <Navigate to="/onboarding-intro" replace />;
    }
    if (!isAuthenticated) {
      return <WelcomePage />;
    }
    return <Navigate to="/home" replace />;
  };

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Main Route - Redirect based on auth and onboarding status */}
      <Route path="/" element={getHomeRoute()} />
      <Route path="/onboarding-intro" element={<OnboardingPage />} />
      <Route path="/onboarding-step-2" element={<OnboardingPage2 />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/onboarding" element={isAuthenticated ? <UserPersonalizationPage /> : <Navigate to="/login" replace />} />
      <Route path="/home" element={<HomePage activeTab={activeTab} onTabChange={handleTabChange} />} />
      <Route path="/food-suggestions" element={<FoodSuggestionsPage activeTab={activeTab} onTabChange={handleTabChange} />} />
      <Route path="/notifications" element={<NotificationsHomePage activeTab={activeTab} onTabChange={handleTabChange} />} />
      <Route path="/recipe/tiramisu" element={<TiramisuRecipePage activeTab={activeTab} onTabChange={handleTabChange} />} />
      <Route path="/view-all" element={<ViewAllPage activeTab={activeTab} onTabChange={handleTabChange} />} />
      <Route path="/ingredient-suggestions-all" element={<IngredientSuggestionsAllPage activeTab={activeTab} onTabChange={handleTabChange} />} />
      <Route path="/weekly-hot-dishes" element={<WeeklyHotDishAllPage activeTab={activeTab} onTabChange={handleTabChange} />} />
      <Route path="/seasonal-dishes" element={<SeasonalDishesAllPage activeTab={activeTab} onTabChange={handleTabChange} />} />
      <Route path="/favorite-dishes" element={<FavoriteDishesAllPage activeTab={activeTab} onTabChange={handleTabChange} />} />
      <Route path="/cooking" element={<CookingMode />} />
      <Route path="/weekly-menu" element={<WeeklyMenuDemo />} />
      <Route path="/weekly-planner" element={<WeeklyPlannerPage />} />
      <Route path="/weekly-planner/preferences" element={<WeeklyPlannerPreferencesPage />} />
      <Route path="/weekly-planner/recipe-editor" element={<RecipeEditorPage />} />
      <Route path="/manage-ingredients">
        <Route index element={<ManageIngredientsPage />} />
        <Route path="add-ingredients" element={<AddIngredientsPage />} />
        <Route path="edit-ingredient/:index" element={<EditIngredientPage />} />
      </Route>
      <Route path="/shop">
        <Route index element={<ShoppingListPage />} />
        <Route path="add" element={<AddItemPage />} />
        <Route path="edit" element={<EditItemPage />} />
      </Route>
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/settings/notifications" element={<NotificationSettings />} />
      <Route path="/settings/help" element={<FAQPage />} />

      {/* This route acts as a catch-all for any other path */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
