import { useEffect, useRef } from "react";

export interface EmojiPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onEmojiSelect: (emoji: string) => void;
}

// Emoji options for selection
const emojiOptions = [
  "🥕",
  "🥬",
  "🥒",
  "🍅",
  "🧄",
  "🧅",
  "🥔",
  "🌶️",
  "🥑",
  "🍆",
  "🥛",
  "🧀",
  "🧈",
  "🥚",
  "🍳",
  "🥓",
  "🥩",
  "🍗",
  "🐟",
  "🦐",
  "🌾",
  "🍞",
  "🥖",
  "🍚",
  "🍜",
  "🥣",
  "🍝",
  "🥧",
  "🍰",
  "🍯",
  "🍎",
  "🍌",
  "🍊",
  "🍇",
  "🍓",
  "🫐",
  "🥭",
  "🍑",
  "🍒",
  "🥝",
  "🥜",
  "🌰",
  "🫘",
  "🍽️",
  "🥄",
  "🥢",
  "🍴",
  "🔥",
  "❄️",
  "🧊",
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
      <div className="mb-2 text-sm font-medium text-gray-700">Chọn biểu tượng:</div>
      <div className="grid max-h-48 grid-cols-8 gap-2 overflow-x-hidden overflow-y-auto">
        {emojiOptions.map((emoji, emojiIndex) => (
          <button key={emojiIndex} onClick={() => onEmojiSelect(emoji)} className="rounded-md p-2 text-lg transition-colors hover:bg-gray-100">
            {emoji}
          </button>
        ))}
      </div>
      <button onClick={onClose} className="mt-3 w-full rounded-md bg-gray-200 py-2 text-sm text-gray-700 hover:bg-gray-300">
        Đóng
      </button>
    </div>
  );
}
