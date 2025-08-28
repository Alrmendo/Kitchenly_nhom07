import type { WeeklyPlan, DayPlan } from "./types";

export const WEEK_START_ISO = "2025-08-25"; // Thứ 2 tuần cố định 25–31/08/2025
export const WEEKLY_PLAN_KEY = `WEEKLY_PLAN_${WEEK_START_ISO}`;

const toDateLocal = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
};

export const addDaysLocal = (iso: string, n: number) => {
  const d = toDateLocal(iso);
  d.setDate(d.getDate() + n);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
};

const defaultPlan = (): WeeklyPlan => {
  const days: DayPlan[] = Array.from({ length: 7 }, (_, i) => ({
    date: addDaysLocal(WEEK_START_ISO, i),
    recipeIds: [],
  }));
  return { days };
};

const isWeeklyPlan = (obj: any): obj is WeeklyPlan =>
  obj && Array.isArray(obj.days) && obj.days.every((d: any) =>
    d && typeof d.date === "string" && Array.isArray(d.recipeIds)
  );

export const loadPlan = (): WeeklyPlan => {
  try {
    const raw = localStorage.getItem(WEEKLY_PLAN_KEY);
    if (!raw) return defaultPlan();
    const parsed = JSON.parse(raw);
    return isWeeklyPlan(parsed) ? (parsed as WeeklyPlan) : defaultPlan();
  } catch {
    return defaultPlan();
  }
};

export const savePlan = (plan: WeeklyPlan) => {
  try {
    localStorage.setItem(WEEKLY_PLAN_KEY, JSON.stringify(plan));
  } catch {}
  window.dispatchEvent(new CustomEvent("plan:updated", { detail: plan }));
};

export const addRecipeToDay = (dateIso: string, recipeId: number) => {
  const plan = loadPlan();
  const d = plan.days.find((x) => x.date === dateIso);
  if (d) d.recipeIds.push(recipeId);
  else plan.days.push({ date: dateIso, recipeIds: [recipeId] });
  savePlan(plan);
};

export const replaceRecipeAt = (dateIso: string, index: number, recipeId: number) => {
  const plan = loadPlan();
  const d = plan.days.find((x) => x.date === dateIso);
  if (!d) return;
  if (index < 0 || index >= d.recipeIds.length) return;
  d.recipeIds[index] = recipeId;
  savePlan(plan);
};

export const removeRecipeAt = (dateIso: string, index: number) => {
  const plan = loadPlan();
  const d = plan.days.find((x) => x.date === dateIso);
  if (!d) return;
  d.recipeIds.splice(index, 1);
  savePlan(plan);
};

export const seedWeekIfEmpty = (
  resolveNameToId: (name: string) => number,
  menuSeed: { [iso: string]: string[] }
) => {
  const plan = loadPlan();
  let changed = false;

  for (const day of plan.days) {
    const current = day.recipeIds ?? [];
    if (current.length > 0) continue;
    const names = menuSeed[day.date] ?? [];
    const ids = names.map((n) => resolveNameToId(n)).filter((id) => id > 0);
    if (ids.length) {
      day.recipeIds = ids;
      changed = true;
    }
  }

  if (changed) savePlan(plan);
};
