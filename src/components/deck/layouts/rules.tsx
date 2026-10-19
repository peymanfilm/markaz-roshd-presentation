"use client";

import type { SlideOf } from "@/lib/deck/types";
import { ListCard, SlideHeader, Stats } from "../parts";

/** چیدمان: سازوکار جلسات + چیپ‌ها */
export function RulesView({ slide }: { slide: SlideOf<"rules"> }) {
  return (
    <div className="flex h-full flex-col gap-[1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      <div className="flex flex-1 flex-col justify-center gap-[0.7cqw]">
        {slide.items.map((it, i) => (
          <ListCard key={i} n={`${["۱", "۲", "۳", "۴"][i]}`} text={it} delay={0.1 + i * 0.08} />
        ))}
      </div>
      <Stats chips={slide.chips} cols={4} delay={0.42} />
    </div>
  );
}
