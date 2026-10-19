"use client";

import type { SlideOf } from "@/lib/deck/types";
import { SlideHeader, TextCard } from "../parts";

/** چیدمان: بلوک‌های حقوقی */
export function LegalView({ slide }: { slide: SlideOf<"legal"> }) {
  return (
    <div className="flex h-full flex-col gap-[0.9cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      <div className="flex flex-1 flex-col justify-center gap-[0.9cqw]">
        {slide.blocks.map((b, i) => (
          <TextCard key={b.t} title={b.t} body={b.b} delay={0.12 + i * 0.1} />
        ))}
      </div>
    </div>
  );
}
