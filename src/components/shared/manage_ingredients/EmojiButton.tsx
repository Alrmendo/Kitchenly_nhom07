import { useState } from "react";
import { EmojiPicker } from "./EmojiPicker";

export interface EmojiButtonProps {
  currentEmoji: string;
  onEmojiSelect: (emoji: string) => void;
  size?: "sm" | "md" | "lg";
  position?: "top" | "bottom";
}

export function EmojiButton({ currentEmoji, onEmojiSelect, size = "md", position = "top" }: EmojiButtonProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiSelect = (emoji: string) => {
    onEmojiSelect(emoji);
    setShowEmojiPicker(false);
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "p-2 text-lg";
      case "md":
        return "p-2 text-lg";
      case "lg":
        return "p-3 text-2xl";
      default:
        return "p-2 text-lg";
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`rounded-lg border-2 border-gray-200 transition-colors hover:border-[#ff8c94] hover:bg-gray-50 ${getSizeClasses()}`}>
        {currentEmoji || "🍽️"}
      </button>

      <EmojiPicker isOpen={showEmojiPicker} onClose={() => setShowEmojiPicker(false)} onEmojiSelect={handleEmojiSelect} position={position} />
    </div>
  );
}
