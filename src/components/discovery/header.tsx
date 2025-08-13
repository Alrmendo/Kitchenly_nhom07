import { Search, Menu } from "lucide-react"
import { useSearch } from "@/hooks/use-search"
import { useGSAPAnimations } from "@/hooks/use-gsap-animations"
import { useEffect } from "react"

export const Header = () => {
  const { searchQuery, isSearchFocused, handleSearchChange, handleSearchFocus, handleSearchBlur } = useSearch()
  const { containerRef, animateStepEntry } = useGSAPAnimations()

  useEffect(() => {
    animateStepEntry()
  }, [animateStepEntry])

  return (
    <div ref={containerRef} className="bg-white px-4 py-3 shadow-sm">

      <div className="flex items-center gap-3">
        <div className={`flex-1 relative transition-all duration-300 ${isSearchFocused ? "scale-105" : ""}`}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm công thức hoặc thực đơn"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>
        <button className="p-2">
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  )
}
