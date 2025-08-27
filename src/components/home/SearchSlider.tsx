import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface SearchSliderProps {
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

export const SearchSlider: React.FC<SearchSliderProps> = ({ isOpen, onClose, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    <>
      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 ease-out ${
          isOpen ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent pointer-events-none'
        }`}
        onClick={handleOverlayClick}
      />
      
      {/* Search Slider */}
      <div 
        className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-500 ease-out ${
          isOpen ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-full opacity-0'
        }`}
        style={{ 
          boxShadow: isOpen ? '0 8px 32px rgba(0, 0, 0, 0.15)' : 'none',
          borderBottomLeftRadius: '24px',
          borderBottomRightRadius: '24px',
          willChange: 'transform, opacity'
        }}
      >
        {/* Header */}
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#666666]">Search</h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
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
          <div className="mb-6">
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
            className="w-full bg-[#ff8c94] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#ff8c94]/90 transition-colors shadow-lg mb-6"
          >
            Tìm Kiếm
          </button>
        </div>
      </div>
    </>
  );
};
