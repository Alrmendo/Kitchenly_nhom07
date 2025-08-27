// src/components/weekly_planner/DayAddRecipe.tsx
import { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Clock, ChefHat, X, ChevronDown, ArrowLeft } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { RECIPES } from "./recipes";
import { addRecipeToDay } from "./planStore";

type NavState = { date?: string }; // YYYY-MM-DD

export default function DayAddRecipe() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const date = (state as NavState)?.date;

  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return RECIPES;
    return RECIPES.filter(
      (r) =>
        r.name.toLowerCase().includes(needle) ||
        r.tags?.some((t) => t.toLowerCase().includes(needle))
    );
  }, [q]);

  const handleBack = () => navigate(-1);
  const handlePick = (recipeId: number) => {
    if (!date) return;
    addRecipeToDay(date, recipeId);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#fffdf9]">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <div className="flex items-center justify-between p-4 border-b border-[#ff8c94]/20 bg-[#ff8c94]">
          <button onClick={handleBack} className="p-1 hover:bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-lg font-semibold text-white">
            Thêm món • {date ? new Date(date + "T00:00").toLocaleDateString("vi-VN") : ""}
          </h2>
          <button onClick={handleBack} className="p-1 hover:bg-white/20 rounded-full">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="px-6 my-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666]" />
            <Input
              placeholder="Search recipes..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-10 bg-[#fafafa] border-[#e5e5e5] text-[#666666] placeholder:text-[#99a1af]"
            />
          </div>
        </div>

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
          <Button
            variant="outline"
            className="w-full justify-between bg-[#fafafa] border-[#e5e5e5] text-[#666666]"
          >
            All Diets
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="px-6 pb-6 space-y-3">
          {filtered.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => handlePick(recipe.id)}
              className="w-full text-left flex gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fafafa]"
            >
              <div className="w-16 h-16 bg-[#eaeaea] rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-[#000000] mb-1">{recipe.name}</h4>
                <div className="flex items-center gap-3 text-sm mb-2">
                  <div className="flex items-center gap-1 text-[#ff8c94]">
                    <Clock className="h-3 w-3" />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#ff8c94]">
                    <ChefHat className="h-3 w-3" />
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {recipe.tags?.map((tag, i) => (
                    <span
                      key={`${recipe.id}-${tag}-${i}`}
                      className="px-2 py-1 rounded-full text-xs font-medium bg-[#ff8c94]/20 text-[#ff8c94] border border-[#ff8c94]/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="text-sm opacity-70 py-6">Không tìm thấy món phù hợp.</div>
          )}
        </div>
      </div>
    </div>
  );
}
