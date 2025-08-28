import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string, selectedTags: string[]) => void;
}

const foodSuggestions = [
  'Ceviche',
  'Hamburger', 
  'Trứng cuốn',
  'Wraps',
  'Kem trứng',
  'Súp cà chua',
  'Mỳ ý',
  'Rau',
  'Bánh kẹp thịt'
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSearch = () => {
    onSearch(searchQuery, selectedTags);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-3xl w-full max-w-md mx-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-[#32201c]">Search</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Search Input */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-[#ff8c94]/10 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-[#ff8c94]/30 text-[#32201c] placeholder-gray-400"
              />
            </div>
          </div>

          {/* Food Suggestions */}
          <div className="mb-6">
            <h3 className="text-base font-medium text-[#32201c] mb-4">Gợi ý món ăn</h3>
            <div className="flex flex-wrap gap-2">
              {foodSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => toggleTag(suggestion)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(suggestion)
                      ? 'bg-[#ff8c94] text-white shadow-md'
                      : 'bg-[#ff8c94]/20 text-[#ff8c94] hover:bg-[#ff8c94]/30'
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Add Allergies */}
          <div className="mb-8">
            <button className="flex items-center gap-2 text-[#32201c] hover:text-[#ff8c94] transition-colors">
              <div className="w-6 h-6 rounded-full bg-[#ff8c94]/20 flex items-center justify-center">
                <Plus className="w-4 h-4 text-[#ff8c94]" />
              </div>
              <span className="font-medium">Thêm dị ứng</span>
            </button>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full bg-[#ff8c94] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#ff8c94]/90 transition-colors shadow-lg"
          >
            Tìm Kiếm
          </button>
        </div>
      </div>
    </div>
  );
};
