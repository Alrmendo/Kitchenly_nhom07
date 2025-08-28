import { useState } from "react";

interface FoodFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filters: FilterState) => void;
}

export interface FilterState {
  selectedFood: string;
  selectedDiet: string;
  selectedLevel: string;
  selectedTime: string;
}

export default function FoodFilterModal({ isOpen, onClose, onApplyFilter }: FoodFilterModalProps) {
  const [selectedFood, setSelectedFood] = useState("Burger")
  const [selectedDiet, setSelectedDiet] = useState("Bắt kì")
  const [selectedLevel, setSelectedLevel] = useState("Trung bình")
  const [selectedTime, setSelectedTime] = useState("25")

  const foodOptions = ["Tất cả", "Bữa trưa", "Bữa tối", "Burger", "Trung Quốc", "Pizza", "Salads", "Súp", "Bữa sáng"]

  const dietOptions = ["Bất kì", "Ăn chay", "Vegan", "Ít đường"]
  const levelOptions = ["Dễ", "Trung bình", "Khó"]
  const timeOptions = ["15", "25", "35", "45"]

  const handleApplyFilter = () => {
    onApplyFilter({
      selectedFood,
      selectedDiet,
      selectedLevel,
      selectedTime,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-center flex-1">Bộ lọc</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Food Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-[#32201c]">Món ăn</h3>
            <button className="text-sm text-gray-500">Xóa tất cả</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {foodOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedFood(option)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFood === option ? "bg-[#ff8c94] text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Diet Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-[#32201c]">Chế độ ăn</h3>
            <button className="text-sm text-gray-500">Xóa tất cả</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {dietOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedDiet(option)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDiet === option ? "bg-[#ff8c94] text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Level Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-[#32201c]">Mức độ</h3>
            <button className="text-sm text-gray-500">Xóa tất cả</button>
          </div>
          <div className="flex gap-2">
            {levelOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedLevel(option)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedLevel === option ? "bg-[#ff8c94] text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Cooking Time Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-[#32201c]">Thời gian nấu</h3>
            <button className="text-sm text-gray-500">Xóa tất cả</button>
          </div>
          <div className="flex gap-4">
            {timeOptions.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`w-16 h-16 rounded-full text-xl font-semibold transition-colors ${
                  selectedTime === time ? "bg-[#ff8c94] text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button 
          onClick={handleApplyFilter}
          className="w-full bg-[#ff8c94] text-white py-4 rounded-2xl text-lg font-medium hover:bg-[#f07784] transition-colors"
        >
          Áp dụng bộ lọc
        </button>
      </div>
    </div>
  )
}
