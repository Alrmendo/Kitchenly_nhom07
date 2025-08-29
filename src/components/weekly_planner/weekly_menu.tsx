// src/components/weekly_planner/WeeklyMenu.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Search, Edit, Trash2, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BottomNavigation } from "../shared/BottomNavigation";

import {
  loadPlan,
  seedWeekIfEmpty,
  WEEK_START_ISO,
  addDaysLocal,
  savePlan,
} from "./planStore";
import { RECIPES } from "./recipes";
import ConfirmDialog from "../shared/confirmDialog";

const isoByDayIndex = (dayIndex: number) => addDaysLocal(WEEK_START_ISO, dayIndex);
const RECIPES_BY_ID = new Map(RECIPES.map((r) => [r.id, r]));

const RECIPE_IMAGE_BY_NAME: Record<string, string> = {
  "bánh mì bơ": "/avocadotoast.png?height=40&width=40",
  "yến mạch ngâm qua đêm": "/overnight-oats.png?height=40&width=40",
  "salad gà nướng": "/GrilledChickenSalad.png?height=40&width=40",
  "rau củ xào chay": "/VegetarianStirFry.png?height=40&width=40",
  "cá hồi sốt teriyaki": "/SalmonTeriyaki.png?height=40&width=40",
  "bát quinoa dinh dưỡng": "/QuinoaBuddhaBowl.png?height=40&width=40",
  "parfait sữa chua hy lạp": "/GreekYogurtParfait.png?height=40&width=40",
  "bánh cuộn gà tây": "/TurkeyWrap.png?height=40&width=40",
  "cơm risotto nấm": "/MushroomRisotto.png?height=40&width=40"
};
const imgFor = (name?: string, fallback?: string) => {
  const key = (name ?? "").trim().toLowerCase();
  return RECIPE_IMAGE_BY_NAME[key] ?? fallback ?? "/placeholder.svg";
};
type PendingDelete = { open: boolean; dateIso?: string; recipeId?: number; recipeName?: string };

export default function WeeklyMenu() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("suggest");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const onPlanUpdated = () => setTick((t) => t + 1);
    window.addEventListener("plan:updated", onPlanUpdated);
    return () => window.removeEventListener("plan:updated", onPlanUpdated);
  }, []);

  const plan = useMemo(() => loadPlan(), [tick]);

  const handleTabChange = (tabId: string) => setActiveTab(tabId);
  const handleSettingsClick = () => navigate("/weekly-planner/preferences");

  useEffect(() => {
    const nameToId = new Map(RECIPES.map((r) => [r.name.trim().toLowerCase(), r.id]));
    const resolve = (n: string) => nameToId.get(n.trim().toLowerCase()) ?? 0;

    const seeds: Record<string, string[]> = {
      [isoByDayIndex(0)]: ["Bánh mì bơ", "Salad gà nướng", "Vegetarian Stir Fry"],
      [isoByDayIndex(1)]: ["Overnight Oats", "Salmon Teriyaki", "Quinoa Buddha Bowl"],
      [isoByDayIndex(2)]: ["Greek Yogurt Parfait", "Turkey Wrap", "Mushroom Risotto"],
      [isoByDayIndex(3)]: ["Shrimp Tacos", "Beef Bulgogi Bowl", "Tofu Curry"],
      [isoByDayIndex(4)]: ["Caprese Sandwich", "Pesto Pasta", "Lentil Soup"],
      [isoByDayIndex(5)]: ["Chicken Pho", "Baked Sweet Potato", "Caesar Salad"],
      [isoByDayIndex(6)]: ["Shakshuka", "Tuna Poke Bowl", "Egg Fried Rice"],
    };

    seedWeekIfEmpty(resolve, seeds);
  }, []);

  const handleAddForDay = (dateIso: string) => {
    navigate("/weekly-planner/day-add", { state: { date: dateIso } });
  };

  const handleEditRecipe = (dateIso: string, itemIndex: number, currentName: string) => {
    navigate("/weekly-planner/recipe-editor", { state: { date: dateIso, itemIndex, mealName: currentName } });
  };

  // const handleDeleteRecipe = (dateIso: string, itemIndex: number) => {
  //   removeRecipeAt(dateIso, itemIndex);
  // };
  const [pendingDelete, setPendingDelete] = useState<PendingDelete>({ open: false });

  const requestDelete = (dateIso: string, recipeId: number, recipeName?: string) => {
    setPendingDelete({ open: true, dateIso, recipeId, recipeName });
  };

  const doDelete = () => {
    const { dateIso, recipeId } = pendingDelete;
    if (!dateIso || !recipeId) {
      setPendingDelete({ open: false });
      return;
    }
    const p = loadPlan();
    const day = p.days.find((d) => d.date === dateIso);
    if (day) {
      day.recipeIds = (day.recipeIds || []).filter((id) => id !== recipeId);
      savePlan(p);
      window.dispatchEvent(new CustomEvent("plan:updated", { detail: p }));
    }
    setPendingDelete({ open: false });
  };

  const cancelDelete = () => setPendingDelete({ open: false });

  return (
    <div className="min-h-screen bg-[#fffdf9]">
      {/* Header */}
  
      <div className="bg-[#ff8c94] px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <Search className="w-6 h-6 text-[#ff8c94]" />
          <h1 className="text-xl font-semibold text-white">Thực đơn tuần</h1>
          <button onClick={handleSettingsClick}>
            <Settings className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Menu Content */}
      <div className="px-4 pb-6 pt-7 space-y-4">
        {Array.from({ length: 7 }, (_, dayIndex) => {
          const dateIso = isoByDayIndex(dayIndex);
          const day = plan.days.find((d) => d.date === dateIso) ?? { date: dateIso, recipeIds: [] };
          const dayRecipes = day.recipeIds.map((id) => RECIPES_BY_ID.get(id)).filter(Boolean) as typeof RECIPES[number][];

          return (
            <Card key={dateIso} className="bg-white rounded-2xl p-4 shadow-sm border border-[#ff8c94]/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-[#32201c]">
                  {new Date(dateIso + "T00:00").toLocaleDateString("vi-VN", { weekday: "long" })}
                </h2>
                <button
                  onClick={() => handleAddForDay(dateIso)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#ff8c94] text-white hover:opacity-90 flex items-center gap-1"
                  aria-label={`Thêm món cho ${dateIso}`}
                  title="Thêm món cho ngày này"
                >
                  <Plus className="w-3 h-3" /> Thêm
                </button>
              </div>

              <div className="space-y-4">
                {dayRecipes.length === 0 ? (
                  <div className="text-sm opacity-70">Chưa có món nào cho ngày này.</div>
                ) : (
                  dayRecipes.map((recipe, itemIndex) => {
                    const displayImage = imgFor(recipe.name);
                    return (
                      <div key={`${recipe.id}-${itemIndex}`} className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[#eaeaea]">
                          <img src={displayImage} alt={recipe.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-[#32201c]">{recipe.name}</h3>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleEditRecipe(dateIso, itemIndex, recipe.name)}
                                className="p-1 rounded-full hover:bg-[#ff8c94]/10 transition-colors"
                                aria-label={`Chỉnh sửa ${recipe.name}`}
                              >
                                <Edit className="w-4 h-4 text-[#ff8c94]" />
                              </button>
                              <button
                                onClick={() => requestDelete(dateIso, itemIndex, recipe.name)}
                                className="p-1 rounded-full hover:bg-red-50 transition-colors"
                                aria-label={`Xóa ${recipe.name}`}
                                title="Xóa"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
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
                      </div>
                    );
                  })
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      <ConfirmDialog
        open={pendingDelete.open}
        title="Xóa món khỏi ngày này?"
        description={
          pendingDelete.recipeName
            ? `Bạn có chắc muốn xóa "${pendingDelete.recipeName}" khỏi ngày đã chọn?`
            : "Bạn có chắc muốn xóa món này?"
        }
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={doDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
