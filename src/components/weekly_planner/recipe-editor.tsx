// src/components/weekly_planner/RecipeEditor.tsx
import { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Clock, ChefHat, X, Plus, ChevronDown, ArrowLeft } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { RECIPES } from "./recipes";
import { replaceRecipeAt } from "./planStore";

type NavState = {
  mealName?: string;
  date?: string;  
  itemIndex?: number;
};

export default function RecipeEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mealName = "Recipe", date, itemIndex } = (location.state || {}) as NavState;

  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return RECIPES;
    return RECIPES.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const handleBack = () => navigate("/weekly-planner");
  const handlePick = (recipeId: number) => {
    if (!date || typeof itemIndex !== "number") return;
    replaceRecipeAt(date, itemIndex, recipeId);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#fffdf9]">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#ff8c94]/20 bg-[#ff8c94]">
          <button onClick={handleBack} className="p-1 hover:bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-lg font-semibold text-white">Chỉnh sửa: {mealName}</h2>
          <button onClick={handleBack} className="p-1 hover:bg-white/20 rounded-full">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Current Selection (UI demo) */}
        <div className="p-6">
          <div className="bg-[#fff7ed] border border-[#ffd6a7] rounded-xl p-4">
            <h3 className="font-semibold text-[#000000] mb-2">{mealName}</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-[#ff6900]">
                <Clock className="h-4 w-4" />
                <span>—</span>
              </div>
              <div className="flex items-center gap-1 text-[#ff6900]">
                <ChefHat className="h-4 w-4" />
                <span>—</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-6 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666]" />
            <Input
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#fafafa] border-[#e5e5e5] text-[#666666] placeholder:text-[#99a1af]"
            />
          </div>
        </div>

        {/* Filters (mock) */}
        <div className="px-6 mb-6 space-y-3">
          <div className="flex gap-3">
            <div className="flex-1">
              <Button
                variant="outline"
                className="w-full justify-between bg-[#fafafa] border-[#e5e5e5] text-[#666666]"
              >
                All Levels
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <Button
                variant="outline"
                className="w-full justify-between bg-[#fafafa] border-[#e5e5e5] text-[#666666]"
              >
                Any Time
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-between bg-[#fafafa] border-[#e5e5e5] text-[#666666]">
            All Diets
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Alternative Recipes */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#000000]">Alternative Recipes ({filtered.length})</h3>
            <Button variant="ghost" size="sm" className="text-[#ff6900] hover:bg-[#fff7ed]">
              <Plus className="h-4 w-4 mr-1" />
              Custom
            </Button>
          </div>

          <div className="space-y-3 pb-6">
            {filtered.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => handlePick(recipe.id)}
                className="flex gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fafafa] cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#eaeaea] rounded-lg flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-[#000000] mb-1">{recipe.name}</h4>
                  <div className="flex items-center gap-3 text-sm mb-2">
                    <div className="flex items-center gap-1 text-[#ff6900]">
                      <Clock className="h-3 w-3" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#ff6900]">
                      <ChefHat className="h-3 w-3" />
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {recipe.tags?.map((tag, index) => (
                      <span
                        key={`${recipe.id}-${tag}-${index}`}
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{ background: "#ff8c9422", color: "#ff8c94", border: "1px solid #ff8c9444" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-sm opacity-70 py-6">Không tìm thấy món phù hợp.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
