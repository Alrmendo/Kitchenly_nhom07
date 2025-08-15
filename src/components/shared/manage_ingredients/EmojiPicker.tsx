import { useEffect, useRef } from "react";

export interface EmojiPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onEmojiSelect: (emoji: string) => void;
}

// Emoji options organized by category
const emojiCategories = [
  {
    title: "Rau củ",
    emojis: ["🥕", "🥬", "🥒", "🍅", "🧄", "🧅", "🥔", "🌶️", "🥑", "🍆", "🌽", "🥦", "🍄", "🥗", "🫑", "🫛"],
  },
  {
    title: "Sữa & Trứng",
    emojis: ["🥛", "🧀", "🧈", "🥚", "🍳", "🍼"],
  },
  {
    title: "Thịt & Hải sản",
    emojis: ["🥓", "🥩", "🍗", "🍖", "🦴", "🍤", "🦐", "🦞", "🦀", "🐟", "🐠", "🦑", "🦦"],
  },
  {
    title: "Ngũ cốc, Bánh mì & Mì",
    emojis: ["🌾", "🍞", "🥖", "🥨", "🥯", "🥐", "🫓", "🥞", "🧇", "🍚", "🍙", "🍘", "🍜", "🍲", "🥣", "🍝", "🍢", "🍡", "🍠"],
  },
  {
    title: "Đồ ăn vặt & Thức ăn nhanh",
    emojis: ["🍟", "🍔", "🌭", "🍕", "🥪", "🌮", "🌯", "🥙", "🥟", "🥠", "🥡"],
  },
  {
    title: "Tráng miệng & Bánh ngọt",
    emojis: ["🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯"],
  },
  {
    title: "Trái cây & Hạt",
    emojis: ["🍎", "🍏", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🥭", "🍍", "🥥", "🍑", "🍒", "🍈", "🥝", "🥜", "🌰", "🫘"],
  },
  {
    title: "Đồ uống",
    emojis: ["🥤", "🧋", "🫖", "☕", "🍵", "🍺", "🍻", "🥂", "🍷", "🍶", "🍸", "🍹", "🧉", "🥛"],
  },
  {
    title: "Gia vị & Sốt",
    emojis: ["🧂", "🍶", "🥫"],
  },
  {
    title: "Dụng cụ & Nấu ăn",
    emojis: ["🍽️", "🥄", "🥢", "🍴", "🔪", "🫙", "🧊", "🔥", "❄️"],
  },
];

export function EmojiPicker({ isOpen, onClose, onEmojiSelect }: EmojiPickerProps) {
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={emojiPickerRef} className={`absolute top-20 left-0 z-10 w-full rounded-lg border bg-white p-4 shadow-lg`}>
      <div className="mb-3 text-sm font-medium text-gray-700">Chọn biểu tượng:</div>
      <div className="max-h-64 overflow-x-hidden overflow-y-auto">
        {emojiCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            {/* Category Header */}
            <div className="mb-2 border-b border-gray-200 pb-1 text-xs font-semibold tracking-wide text-gray-600 uppercase">{category.title}</div>
            {/* Category Emojis */}
            <div className="grid grid-cols-8 gap-2">
              {category.emojis.map((emoji, emojiIndex) => (
                <button key={emojiIndex} onClick={() => onEmojiSelect(emoji)} className="rounded-md p-2 text-lg transition-colors hover:bg-gray-100 active:bg-gray-200">
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="mt-3 w-full rounded-md bg-gray-200 py-2 text-sm text-gray-700">
        Đóng
      </button>
    </div>
  );
}
