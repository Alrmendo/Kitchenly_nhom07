import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ItemForm from "./ItemForm";
import { guessImageForName, type Item, isCustomId, updateCustomItem, addCustomItem } from "./data";

export default function EditItemPage() {
  const navigate = useNavigate();
  const FORM_ID = "edit-item-form";
  const { state } = useLocation() as { state?: { item?: Item } };
  const item = state?.item;
  if (!item) return <div className="p-6">Không có dữ liệu để sửa.</div>;

  const initial = {
    name: item.name,
    quantity: String(item.qty ?? ""),
    unit: item.unit ?? "",
    note: item.note ?? "",
    date: item.date ?? "",
  };

  return (
    <div className="mx-auto h-[100dvh] max-w-[430px] bg-gray-50 flex flex-col">
      <div className="sticky top-0 z-30 bg-white border-b">
        <div className="flex items-center px-4 py-3">
          <button onClick={() => navigate("/shop")} className="p-1 rounded-lg hover:bg-gray-100" aria-label="Quay lại danh sách">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold -translate-x-2">Chỉnh sửa</h1>
          <button
            type="submit"
            form={FORM_ID}
            className="px-3 py-1.5 text-sm font-semibold rounded-xl bg-[#FF8C94] text-white hover:opacity-90"
          >
            Lưu
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F7F8FA]">
        <ItemForm
          formId={FORM_ID}
          initial={initial}
          onSubmit={(v) => {
            const qty = Number(v.quantity.replace(",", "."));
            if (!Number.isFinite(qty) || qty <= 0) return;

            const patch = {
              name: v.name.trim(),
              qty,
              unit: v.unit || undefined,
              img: v.img ?? guessImageForName(v.name) ?? item.img,
              date: v.date,
              note: v.note || undefined,
            };

            if (isCustomId(item.id)) {
              // Sửa trực tiếp mục custom
              updateCustomItem(item.id, patch);
            } else {
              // Item sinh từ plan: tạo 1 mục custom để override/hợp nhất
              addCustomItem({ ...patch, checked: item.checked ?? false });
            }

            navigate("/shop", { replace: true });
          }}
        />
      </div>
    </div>
  );
}
