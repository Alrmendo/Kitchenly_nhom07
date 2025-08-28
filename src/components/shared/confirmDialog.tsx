import { X } from "lucide-react";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title = "Xác nhận",
  description = "Bạn có chắc muốn thực hiện thao tác này?",
  confirmText = "Xóa",
  cancelText = "Hủy",
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      <div className="relative z-[101] w-[92%] max-w-[420px] rounded-2xl bg-white shadow-xl border border-gray-100">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="text-base font-semibold">{title}</h3>
          <button
            onClick={onCancel}
            className="p-1 rounded-lg hover:bg-gray-100"
            aria-label="Đóng"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="px-4 py-4 text-sm text-gray-600">{description}</div>

        <div className="px-4 pb-4 pt-2 flex items-center justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-2 text-sm font-medium rounded-xl border border-gray-200 hover:bg-gray-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-2 text-sm font-semibold rounded-xl bg-red-500 text-white hover:opacity-90"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
