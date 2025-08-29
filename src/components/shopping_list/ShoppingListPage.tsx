import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import SearchBox from "./SearchBox";
import ListSections from "./ListSections";
import FloatingAdd from "./FloatingAdd";
import DateRangeModal from "./DateRangeModal";
import { BottomNavigation } from "@/components/shared/BottomNavigation";
import {
  type Section,
  startOfDay, isSameDay, fmt, isInSelectedDateRange,
  loadSections,
  groupItemsByCategory,
  saveSections,
} from "./data";
import { WEEKLY_PLAN_KEY } from "../weekly_planner/planStore";

export default function ShoppingListPage() {
  const [activeTab, setActiveTab] = React.useState("shop");
  const [sections, setSections] = React.useState<Section[]>(() => loadSections());
  const [q, setQ] = React.useState("");
  const navigate = useNavigate();

  const [openCal, setOpenCal] = React.useState(false);
  const todayStart = startOfDay(new Date());
  const [range, setRange] = React.useState<{ startDate?: Date; endDate?: Date }>({
    startDate: todayStart,
    endDate: todayStart,
  });

  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === WEEKLY_PLAN_KEY) setSections(loadSections());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  React.useEffect(() => {
    const onPlanUpdated = () => setSections(loadSections());
    window.addEventListener("plan:updated", onPlanUpdated as EventListener);
    return () => window.removeEventListener("plan:updated", onPlanUpdated as EventListener);
  }, []);

  React.useEffect(() => {
    const onCustom = () => setSections(loadSections());
    window.addEventListener("shopping:custom_updated", onCustom as EventListener);
    return () => window.removeEventListener("shopping:custom_updated", onCustom as EventListener);
  }, []);

  React.useEffect(() => {
    setSections(loadSections());
  }, []);

  const displayRange = () => {
    if (!range.startDate || !range.endDate) return "Chọn ngày";
    const t = startOfDay(new Date());
    if (isSameDay(range.startDate, t) && isSameDay(range.endDate, t)) return "Hôm nay";
    return `${fmt(range.startDate)} - ${fmt(range.endDate)}`;
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/${tabId}`);
  };

  const filtered: Section[] = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    const { startDate, endDate } = range;

    const filteredByTextDate = sections
      .map((sec) => ({
        ...sec,
        items: sec.items.filter((i) => {
          const okText = !s || i.name.toLowerCase().includes(s);
          const okDate = !startDate || !endDate ? true : isInSelectedDateRange(i.date, startDate, endDate);
          return okText && okDate;
        }),
      }))
      .filter((sec) => sec.items.length);

    if (!startDate || !endDate) return filteredByTextDate;

    const flat = filteredByTextDate.flatMap((sec) => sec.items);
    return groupItemsByCategory(flat);
  }, [q, sections, range]);

  const toggle = (id: string) => {
    setSections((prev) => {
      const next = prev.map((sec) => ({
        ...sec,
        items: sec.items.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)),
      }));
      saveSections(next);
      return next;
    });
  };

  const edit = (id: string) => {
    const item = sections.flatMap((s) => s.items).find((i) => i.id === id);
    if (!item) return;
    navigate("/shop/edit", { state: { item } });
  };

  return (
    <div className="mx-auto h-[100dvh] max-w-[430px] bg-gray-50 flex flex-col">
      <div className="sticky top-0 z-30 bg-[#F9FAFB]">
        <Header />
        <SearchBox value={q} onChange={setQ} onOpenCalendar={() => setOpenCal(true)} displayRange={displayRange} />
      </div>

      <FloatingAdd onClick={() => navigate("/shop/add")} />

      <div className="flex-1 overflow-y-auto overscroll-y-contain pt-3 pb-28">
        <ListSections sections={filtered} onToggle={toggle} onEdit={edit} />
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      <DateRangeModal open={openCal} onClose={() => setOpenCal(false)} value={range} onApply={(sel) => setRange(sel)} />
    </div>
  );
}
