import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ItemForm from "./ItemForm";
import { loadSections, saveSections, type Item, guessImageForName } from "./data";

export default function AddItemPage() {
  const navigate = useNavigate();
  const FORM_ID = "add-item-form";
  return (
    <div className="mx-auto h-[100dvh] max-w-[430px] bg-gray-50 flex flex-col">
      <div className="sticky top-0 z-30 bg-white border-b">
        <div className="flex items-center px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-1 rounded-lg hover:bg-gray-100" aria-label="Quay lại">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold -translate-x-2">Thêm sản phẩm</h1>
          <button
            type="submit"
            form={FORM_ID}
            className="px-3 py-1.5 text-sm font-semibold rounded-xl bg-[#FF8C94] text-white hover:opacity-90"
          >
            Thêm
          </button>
        </div>

      </div>

      <div className="flex-1 overflow-y-auto bg-[#F7F8FA]">
        <ItemForm
          formId={FORM_ID}
          onSubmit={(v) => {
            const sections = loadSections();
            const first = sections[0] ?? { title: "Danh sách của tôi", items: [] as Item[] };
            if (!sections[0]) sections.unshift(first);
            const nextId =
              String(Math.max(0, ...sections.flatMap(s => s.items.map(i => Number(i.id)))) + 1);
            first.items.unshift({
              id: nextId,
              name: v.name,
              qty: v.unit ? `${v.quantity} ${v.unit}` : v.quantity,
              img: v.img ?? guessImageForName(v.name),
              checked: false,
              date: v.date,
              note: v.note || undefined,
            });
            saveSections(sections);               
            navigate("/shop", { replace: true });
          }}
        />
      </div>
    </div>
  );
}
