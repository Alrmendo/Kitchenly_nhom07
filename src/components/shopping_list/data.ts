export type Item = {
  id: string;
  name: string;
  qty: number;
  unit?: string;
  img?: string;
  checked: boolean;
  date: string;   // YYYY-MM-DD
  note?: string;
};

export type Section = {
  title: string;
  items: Item[];
};

export type CategoryName =
  | "Hải sản"
  | "Thịt"
  | "Trứng & Sữa"
  | "Rau củ quả"
  | "Gia vị & Dầu"
  | "Ngũ cốc & Hạt"
  | "Bánh mì & Vỏ bánh"
  | "Khác";

const CATEGORY_ORDER: CategoryName[] = [
  "Hải sản",
  "Thịt",
  "Trứng & Sữa",
  "Rau củ quả",
  "Gia vị & Dầu",
  "Ngũ cốc & Hạt",
  "Bánh mì & Vỏ bánh",
  "Khác",
];

const KEYWORDS: Record<CategoryName, string[]> = {
  "Hải sản": ["cá", "cá hồi", "tôm", "mực", "bạch tuộc", "ngao", "hàu", "sashimi"],
  "Thịt": ["thịt", "gà", "bò", "heo", "lợn", "gà tây", "turkey", "xúc xích", "ba rọi"],
  "Trứng & Sữa": [
    "trứng", "sữa", "sữa chua", "yogurt", "phô mai", "parmesan",
    "sữa hạnh nhân", "yogurt hy lạp", "greek yogurt"
  ],
  "Rau củ quả": [
    "xà lách", "rau", "cà chua", "cà chua bi", "cà rốt", "bông cải", "bông cải xanh",
    "nấm", "hành", "hành tây", "chuối", "dâu", "dâu tây", "bơ", "bắp cải tím", "khoai tây",
    "đậu lăng khô", "lá húng quế", "lá nguyệt quế", "cần tây", "ngò gai", "khoai lang", "ngò rí", "cà tím"
  ],
  "Gia vị & Dầu": [
    "muối", "tiêu", "dầu", "dầu olive", "xì dầu", "nước tương", "mật ong", "tahini",
    "đường", "nước mắm", "gừng", "tỏi", "paprika", "pesto", "teriyaki"
  ],
  "Ngũ cốc & Hạt": ["yến mạch", "quinoa", "gạo", "gạo arborio", "granola", "hạt", "mè", "chia"],
  "Bánh mì & Vỏ bánh": ["bánh mì", "tortilla", "vỏ bánh"],
  "Khác": [],
};

const normalizeText = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

const norm = (s: string) => normalizeText(s).trim();

export const categorizeIngredient = (name: string): CategoryName => {
  const n = norm(name);
  for (const cat of CATEGORY_ORDER) {
    for (const kw of KEYWORDS[cat]) {
      if (!kw) continue;
      if (n.includes(norm(kw))) return cat;
    }
  }
  return "Khác";
};

export const groupItemsByCategory = (items: Item[]): Section[] => {
  const map = new Map<CategoryName, Item[]>();
  for (const cat of CATEGORY_ORDER) map.set(cat, []);

  for (const it of items) {
    const cat = categorizeIngredient(it.name);
    map.get(cat)!.push(it);
  }

  const sections: Section[] = [];
  for (const cat of CATEGORY_ORDER) {
    const arr = map.get(cat)!;
    if (!arr.length) continue;
    sections.push({
      title: cat,
      items: arr.sort((a, b) => a.name.localeCompare(b.name, "vi")),
    });
  }
  return sections;
};

const imageKeywords: Array<{ src: string; keywords: string[] }> = [
  { src: "/rice.png", keywords: ["gao", "rice"] },
  { src: "/tomato.png", keywords: ["ca chua", "tomato"] },
  { src: "/oat.png", keywords: ["yen mach", "oat"] },
  { src: "/shrimp.png", keywords: ["tom", "shrimp"] },
  { src: "/salmon.png", keywords: ["ca hoi", "salmon"] },
  { src: "/mineralwater.png", keywords: ["nuoc khoang", "nuoc suoi", "mineral water", "water"] },
  { src: "/almondmilk.png", keywords: ["sua hanh nhan", "almond milk"] },
  { src: "/eggplant.png", keywords: ["ca tim", "eggplant"] },
  { src: "/fish.png", keywords: ["ca", "fish"] },
  { src: "/chicken.png", keywords: ["ga", "chicken"] },
  { src: "/beef.png", keywords: ["thit bo", "beef"] },
  { src: "/pork.png", keywords: ["thit heo", "thit lon", "pork"] },
  { src: "/milk.png", keywords: ["sua", "milk"] },
  { src: "/cheese.png", keywords: ["pho mai", "cheese"] },
  { src: "/broccoli.png", keywords: ["bong cai xanh", "bong cai", "broccoli"] },
  { src: "/mushroom.png", keywords: ["nam", "mushroom"] },
  { src: "/carrot.png", keywords: ["ca rot", "carrot"] },
  { src: "/onion.png", keywords: ["hanh tay", "onion"] },
  { src: "/banana.png", keywords: ["chuoi", "banana"] },
  { src: "/teriyaki.png", keywords: ["teriyaki"] },
  { src: "/strawberry.png", keywords: ["dau tay", "strawberry"] },
  { src: "/avocado.png", keywords: ["bo", "avocado"] },
  { src: "/salt.png", keywords: ["muoi", "salt"] },
  { src: "/pepper.png", keywords: ["tieu", "pepper"] },
  { src: "/oliveoil.png", keywords: ["dau olive", "olive oil", "dau an", "dau me"] },
  { src: "/soy-sauce.png", keywords: ["xi dau", "nuoc tuong", "soy sauce"] },
  { src: "/honey.png", keywords: ["mat ong", "honey"] },
  { src: "/tahini.png", keywords: ["tahini"] },
  { src: "/sugar.png", keywords: ["duong", "sugar"] },
  { src: "/oatmeal.png", keywords: ["yen mach", "oatmeal"] },
  { src: "/quinoa.png", keywords: ["quinoa"] },
  { src: "/granola.png", keywords: ["granola"] },
  { src: "/bread.png", keywords: ["banh mi", "bread"] },
  { src: "/tortilla.png", keywords: ["tortilla"] },
  { src: "/lemon.png", keywords: ["chanh", "lemon"] },
  { src: "/garlic.png", keywords: ["toi", "garlic"] },
  { src: "/ginger.png", keywords: ["gung", "ginger"] },
  { src: "/chia.png", keywords: ["chia", "chia seeds"] },
  { src: "/cucumber.png", keywords: ["dua leo", "cucumber"] },
  { src: "/balsamic.png", keywords: ["balsamic", "vinegar"] },
  { src: "/wine.png", keywords: ["ruou", "wine"] },
  { src: "/egg.png", keywords: ["trung ga", "egg"] },
  { src: "/potato.png", keywords: ["khoai tay", "potato"] },
  { src: "/darkbrownsugar.png", keywords: ["duong nau", "dark brown sugar", "đường nâu"] },
  { src: "/ngori.png", keywords: ["ngo ri", "cilantro", "ngò rí"] },
  { src: "/coconutcream.png", keywords: ["nuoc cot dua", "coconut cream"] },
  { src: "/mayo.png", keywords: ["mayonnaise", "mayo"] },
  { src: "/daulang.png", keywords: ["daulang", "dau lang", "đậu lăng"] },
  { src: "/hungque.png", keywords: ["hung que", "basil", "húng quế"] },
  { src: "/nguyetque.png", keywords: ["nguyet que", "mint"] },
  { src: "/pasta.png", keywords: ["pasta", "mi y"] },
  { src: "/pesto.png", keywords: ["pesto"] },
];

export const guessImageForName = (name: string): string | undefined => {
  const n = normalizeText(name);
  if (!n) return undefined;
  for (const entry of imageKeywords) {
    for (const kw of entry.keywords) {
      if (n.includes(normalizeText(kw))) return entry.src;
    }
  }
  return undefined;
};

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const addDays = (d: Date, days: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
export const getThisMonthRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start, end };
};

export const toISO = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const toDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const isInSelectedDateRange = (iso: string | undefined, startDate?: Date | null, endDate?: Date | null) => {
  if (!iso || !startDate || !endDate) return false;
  const d = toDate(iso);
  if (!d) return false;
  return d >= startDate && d <= endDate;
};

export const fmt = (date?: Date | null) =>
  date?.toLocaleDateString("vi-VN", { day: "numeric", month: "numeric" });

export const isSameDay = (a?: Date | null, b?: Date | null) =>
  !!a && !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const CHECK_STATE_KEY = "shopping_check_state_v1";
type CheckState = Record<string, { checked?: boolean; note?: string }>;

const loadCheckState = (): CheckState => {
  try {
    const raw = localStorage.getItem(CHECK_STATE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};
const saveCheckState = (s: CheckState) => {
  try {
    localStorage.setItem(CHECK_STATE_KEY, JSON.stringify(s));
  } catch {}
};

const stabilizeDerivedId = (dateIso: string, ingName: string, unit?: string) =>
  `${dateIso}|${normalizeText(ingName)}|${unit ?? ""}`;

export const CUSTOM_ITEMS_KEY = "shopping_custom_items_v1";
type CustomItem = Item;

export const loadCustomItems = (): CustomItem[] => {
  try {
    const raw = localStorage.getItem(CUSTOM_ITEMS_KEY);
    const arr = raw ? (JSON.parse(raw) as CustomItem[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};

export const saveCustomItems = (arr: CustomItem[]) => {
  try {
    localStorage.setItem(CUSTOM_ITEMS_KEY, JSON.stringify(arr));
  } catch {}
  window.dispatchEvent(new Event("shopping:custom_updated"));
};

export const isCustomId = (id: string) => id.startsWith("c_");

export const addCustomItem = (it: Omit<CustomItem, "id" | "checked"> & { id?: string; checked?: boolean }) => {
  const items = loadCustomItems();
  const id = it.id ?? `c_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  items.unshift({
    id,
    name: it.name,
    qty: it.qty,
    unit: it.unit,
    img: it.img ?? guessImageForName(it.name),
    checked: !!it.checked,
    date: it.date,
    note: it.note,
  });
  saveCustomItems(items);
};

export const updateCustomItem = (id: string, patch: Partial<CustomItem>) => {
  const items = loadCustomItems();
  const idx = items.findIndex((x) => x.id === id);
  if (idx >= 0) {
    items[idx] = { ...items[idx], ...patch, id: items[idx].id };
    saveCustomItems(items);
  }
};

export const removeCustomItem = (id: string) => {
  const items = loadCustomItems().filter((x) => x.id !== id);
  saveCustomItems(items);
};

import { loadPlan } from "@/components/weekly_planner/planStore";
import { RECIPES } from "@/components/weekly_planner/recipes";

const RECIPES_BY_ID = new Map(RECIPES.map((r) => [r.id, r]));
const groupByDay = true;

export const buildSectionsFromPlan = (): Section[] => {
  const plan = loadPlan();
  const check = loadCheckState();

  const sectionsMap = new Map<string, Item[]>();
  const ensureSection = (title: string) => {
    if (!sectionsMap.has(title)) sectionsMap.set(title, []);
    return sectionsMap.get(title)!;
  };

  type AggKey = string;
  const agg = new Map<AggKey, { name: string; qty: number; unit?: string; date: string }>();

  for (const day of plan.days) {
    const dateIso = day.date;
    for (const rid of day.recipeIds ?? []) {
      const recipe = RECIPES_BY_ID.get(rid);
      if (!recipe) continue;
      for (const ing of recipe.ingredients) {
        const key = `${dateIso}|${normalizeText(ing.name)}|${ing.unit ?? ""}`;
        const prev = agg.get(key);
        if (prev) prev.qty += ing.qty;
        else agg.set(key, { name: ing.name, qty: ing.qty, unit: ing.unit, date: dateIso });
      }
    }
  }

  for (const { name, qty, unit, date } of agg.values()) {
    const d = toDate(date);
    const title = groupByDay
      ? d?.toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit" }) || "Không xác định"
      : "Weekly Planner";
    const id = stabilizeDerivedId(date, name, unit);
    const img = guessImageForName(name);
    const checked = !!check[id]?.checked;
    const note = check[id]?.note;
    ensureSection(title).push({ id, name, qty, unit, img, checked, date, note });
  }

  const customs = loadCustomItems();
  for (const ci of customs) {
    const d = toDate(ci.date);
    const title = groupByDay
      ? d?.toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit" }) || "Không xác định"
      : "Weekly Planner";
    const arr = ensureSection(title);

    const nn = normalizeText(ci.name);
    const uu = ci.unit ?? "";
    for (let i = arr.length - 1; i >= 0; i--) {
      const it = arr[i];
      if (!isCustomId(it.id)) {
        const same = normalizeText(it.name) === nn && (it.unit ?? "") === uu;
        if (same) arr.splice(i, 1);
      }
    }

    const stored = check[ci.id] || {};
    arr.push({
      ...ci,
      checked: stored.checked ?? ci.checked ?? false,
      note: stored.note ?? ci.note,
    });
  }

  const sections: Section[] = [];
  for (const [title, items] of sectionsMap.entries()) {
    sections.push({ title, items: items.sort((a, b) => a.name.localeCompare(b.name, "vi")) });
  }
  if (groupByDay) {
    sections.sort((a, b) => {
      const getKey = (t: string) => {
        const m = t.match(/(\d{2})\/(\d{2})/);
        if (!m) return 0;
        const [, dd, mm] = m;
        return Number(mm) * 100 + Number(dd);
      };
      return getKey(a.title) - getKey(b.title);
    });
  }
  return sections;
};

export const STORAGE_KEY = "shopping_sections_from_plan_v1";

export const loadSections = (): Section[] => {
  return buildSectionsFromPlan();
};

export const saveSections = (sections: Section[]) => {
  const state = loadCheckState();
  for (const s of sections) {
    for (const i of s.items) {
      const prev = state[i.id] || {};
      state[i.id] = { checked: i.checked, note: i.note ?? prev.note };
    }
  }
  saveCheckState(state);
};
