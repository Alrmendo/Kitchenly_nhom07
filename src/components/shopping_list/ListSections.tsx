import React from "react";
import SectionWrapper from "./SectionWrapper";
import ItemCard from "./ItemCard";
import type { Section, Item } from "./data";

type ListSectionsProps = {
  sections: Section[];
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
};

export default function ListSections({
  sections,
  onToggle,
  onEdit,
}: ListSectionsProps) {
  return (
    <div className="pt-3">
      {sections.map((sec: Section) => (
        <SectionWrapper key={sec.title} title={sec.title}>
          {sec.items.map((item: Item) => (
            <ItemCard
              key={item.id}
              item={item}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          ))}
        </SectionWrapper>
      ))}
    </div>
  );
}
