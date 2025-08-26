export type Item = {
  id: string;
  name: string;
  qty: number;
  unit?: string;
  img?: string;
  checked: boolean;
  date: string;
  note?: string;
};

export type Section = {
  title: string;
  items: Item[];
};

const normalizeText = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

const imageKeywords: Array<{ src: string; keywords: string[] }> = [
  { src: "/tomato.png", keywords: ["ca chua", "tomato"] },
  { src: "/oat.png", keywords: ["yen mach", "oat"] },
  { src: "/shrimp.png", keywords: ["tom", "shrimp"] },
  { src: "/salmon.png", keywords: ["ca hoi", "salmon"] },
  { src: "/mineralwater.png", keywords: ["nuoc khoang", "nuoc suoi", "mineral water", "water"] },
  { src: "/almondmilk.png", keywords: ["sua hanh nhan", "almond milk"] },
  { src: "/eggplant.png", keywords: ["ca tim", "eggplant"] },
  { src: "/fish.png", keywords: ["ca", "fish"] },
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

export const toDate = (iso?: string) => {
  if (!iso) return null;
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

export const initialSections: Section[] = [
  {
    title: "Danh sách của tôi",
    items: [
      { id: "1", name: "Cà chua", qty: 2, unit: "kg", img: "/tomato.png", checked: false, date: "2025-08-15" },
      { id: "2", name: "Yến mạch", qty: 2, unit: "packets", img: "/oat.png", checked: false, date: "2025-08-10" },
    ],
  },
  {
    title: "Hải sản",
    items: [
      { id: "3", name: "Phi lê cá hồi", qty: 200, unit: "g", img: "/salmon.png", checked: false, date: "2025-08-10" },
      { id: "4", name: "Tôm", qty: 500, unit: "g", img: "/shrimp.png", checked: false, date: "2025-08-12" },
    ],
  },
  {
    title: "Đồ uống",
    items: [
      { id: "5", name: "Nước khoáng", qty: 12, unit: "chai", img: "/mineralwater.png", checked: true, date: "2025-08-08" },
      { id: "6", name: "Sữa hạnh nhân", qty: 1, unit: "hộp", img: "/almondmilk.png", checked: false, date: "2025-08-11" },
    ],
  },
];


export const STORAGE_KEY = "shopping_sections";
export const loadSections = (): Section[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialSections;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initialSections;
  } catch {
    return initialSections;
  }
};
export const saveSections = (sections: Section[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
  } catch {
  }
};