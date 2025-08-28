import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import ItemForm from "./ItemForm";
import {
  guessImageForName,
  type Item,
  isCustomId,
  updateCustomItem,
  addCustomItem,
  removeCustomItem,
} from "./data";
import React from "react";
import ConfirmDialog from "../shared/confirmDialog";

export default function EditItemPage() {
  const navigate = useNavigate();
  const FORM_ID = "edit-item-form";
  const { state } = useLocation() as { state?: { item?: Item } };
  const item = state?.item;
  const [openConfirm, setOpenConfirm] = React.useState(false);

  if (!item) return <div className="p-6">Không có dữ liệu để sửa.</div>;

  const canDelete = isCustomId(item.id);

  const handleDelete = () => {
    if (!canDelete) return;
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    removeCustomItem(item.id);
    setOpenConfirm(false);
    navigate("/shop", { replace: true });
  };

  const handleCancelDelete = () => {
    setOpenConfirm(false);
  };

  return (
    <div className="mx-auto h-[100dvh] max-w-[430px] bg-gray-50 flex flex-col">
      <div className="sticky top-0 z-30 bg-white border-b">
        <div className="flex items-center px-4 py-3 gap-2">
          <button
            onClick={() => navigate("/shop")}
            className="p-1 rounded-lg hover:bg-gray-100"
            aria-label="Quay lại danh sách"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>

          <h1 className="flex-1 text-center text-lg font-semibold -translate-x-2">
            Chỉnh sửa
          </h1>

          
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-semibold rounded-xl
                        bg-red-50 text-red-600 hover:bg-red-100"
            title="Xóa sản phẩm này"
          >
            <Trash2 className="h-4 w-4" />
            Xóa
          </button>
          

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
          initial={{
            name: item.name,
            quantity: String(item.qty ?? ""),
            unit: item.unit ?? "",
            note: item.note ?? "",
            date: item.date ?? "",
          }}
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
              updateCustomItem(item.id, patch);
            } else {
              addCustomItem({ ...patch, checked: item.checked ?? false });
            }

            navigate("/shop", { replace: true });
          }}
        />
      </div>

      <ConfirmDialog
        open={openConfirm}
        title="Xóa sản phẩm?"
        description={`Bạn có chắc muốn xóa "${item.name}" khỏi Danh sách của tôi?`}
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
