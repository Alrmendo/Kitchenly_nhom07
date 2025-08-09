import { useState, useCallback } from "react"

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
  }, [])

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true)
  }, [])

  const handleSearchBlur = useCallback(() => {
    setIsSearchFocused(false)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQuery("")
  }, [])

  return {
    searchQuery,
    isSearchFocused,
    handleSearchChange,
    handleSearchFocus,
    handleSearchBlur,
    clearSearch,
  }
}
