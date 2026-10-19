"use client";

import type { SlideOf } from "@/lib/deck/types";
import { CheckCard, SlideHeader } from "../parts";

/** چیدمان: چک‌لیست وظایف شورا */
export function ChecklistView({ slide }: { slide: SlideOf<"checklist"> }) {
  return (
    <div className="flex h-full flex-col p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      <div className="flex flex-1 flex-col justify-center gap-[0.85cqw]">
        {slide.items.map((it, i) => (
          <CheckCard key={i} text={it} delay={0.1 + i * 0.08} />
        ))}
      </div>
    </div>
  );
}
