import React from "react";

export default function SectionWrapper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-4 mb-4">
      <div className="relative rounded-2xl bg-white overflow-hidden border border-gray-100 shadow-sm">
        <div className="absolute left-4 right-4 -bottom-2 h-3 bg-rose-200/60 rounded-full blur-md" />
        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-sm font-semibold text-gray-800">{title}</span>
        </div>
        <div className="bg-gradient-to-b from-white to-rose-50 p-3 space-y-3">{children}</div>
      </div>
    </div>
  );
}
