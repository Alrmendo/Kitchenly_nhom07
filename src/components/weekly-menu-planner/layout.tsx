import React from "react"

interface WeeklyMenuLayoutProps {
  children: React.ReactNode
}

export default function WeeklyMenuLayout({ children }: WeeklyMenuLayoutProps) {
  return (
    <div className="weekly-menu-planner">
      {children}
    </div>
  )
}
