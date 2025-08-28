import { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Clock, ChefHat, X, Plus, ChevronDown, ArrowLeft } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { RECIPES, RECIPES_BY_ID } from "./recipes";
import { loadPlan, replaceRecipeAt } from "./planStore";
import ConfirmDialog from "../shared/confirmDialog";

type NavState = {
  mealName?: string;
  date?: string;
  itemIndex?: number;
};

const RECIPE_IMAGE_BY_NAME: Record<string, string> = {
  "avocado toast": "/avocadotoast.png?height=40&width=40",
  "overnight oats": "/overnight-oats.png?height=40&width=40",
  "grilled chicken salad": "/GrilledChickenSalad.png?height=40&width=40",
  "vegetarian stir fry": "/VegetarianStirFry.png?height=40&width=40",
  "salmon teriyaki": "/SalmonTeriyaki.png?height=40&width=40",
  "quinoa buddha bowl": "/QuinoaBuddhaBowl.png?height=40&width=40",
  "greek yogurt parfait": "/GreekYogurtParfait.png?height=40&width=40",
  "turkey wrap": "/TurkeyWrap.png?height=40&width=40",
  "mushroom risotto": "/MushroomRisotto.png?height=40&width=40"
};
const imgFor = (name?: string) => {
  const key = (name ?? "").trim().toLowerCase();
  return RECIPE_IMAGE_BY_NAME[key] ?? "/placeholder.svg";
};
export default function RecipeEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mealName = "Recipe", date, itemIndex } = (location.state || {}) as NavState;

  const [searchQuery, setSearchQuery] = useState("");

  const [pending, setPending] = useState<{ open: boolean; recipeId?: number; recipeName?: string }>({
    open: false,
  });

  const currentRecipe = useMemo(() => {
    if (!date || typeof itemIndex !== "number") return null;
    const plan = loadPlan();
    const day = plan.days.find((d) => d.date === date);
    const id = day?.recipeIds?.[itemIndex];
    return id ? RECIPES_BY_ID.get(id) ?? null : null;
  }, [date, itemIndex]);
  
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return RECIPES;
    return RECIPES.filter(
      (r) => r.name.toLowerCase().includes(q) || r.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const handleBack = () => navigate("/weekly-planner");

  const handlePick = (recipeId: number, recipeName: string) => {
    setPending({ open: true, recipeId, recipeName });
  };

  const confirmReplace = () => {
    if (!date || typeof itemIndex !== "number" || !pending.recipeId) {
      setPending({ open: false });
      return;
    }
    replaceRecipeAt(date, itemIndex, pending.recipeId);
    setPending({ open: false });
    navigate(-1);
  };

  const cancelReplace = () => setPending({ open: false });

  return (
    <div className="min-h-screen bg-[#fffdf9]">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <div className="flex items-center justify-between p-4 border-b border-[#ff8c94]/20 bg-[#ff8c94]">
          <button onClick={handleBack} className="p-1 hover:bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-lg font-semibold text-white">Chỉnh sửa: {mealName}</h2>
          <button onClick={handleBack} className="p-1 hover:bg-white/20 rounded-full">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-[#fff7ed] border border-[#ffd6a7] rounded-xl p-4">
            <h3 className="font-semibold text-[#000000] mb-2">{mealName}</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-[#ff6900]">
                <Clock className="h-4 w-4" />
                <span>{currentRecipe?.time}</span>
              </div>
              <div className="flex items-center gap-1 text-[#ff6900]">
                <ChefHat className="h-4 w-4" />
                <span>{currentRecipe?.difficulty}</span>
              </div>
            </div>
          </div>
        </div>

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

        <div className="px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#000000]">Alternative Recipes</h3>

          </div>

          <div className="space-y-3 pb-6">
            {filtered.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => handlePick(recipe.id, recipe.name)}
                className="flex gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fafafa] cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#eaeaea] rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={imgFor(recipe.name)}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
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

      <ConfirmDialog
        open={pending.open}
        title="Thay đổi món?"
        description={
          pending.recipeName
            ? `Bạn có chắc muốn thay "${mealName}" bằng "${pending.recipeName}"?`
            : "Bạn có chắc muốn thay đổi món này?"
        }
        confirmText="Đổi món"
        cancelText="Hủy"
        onConfirm={confirmReplace}
        onCancel={cancelReplace}
      />
    </div>
  );
}
