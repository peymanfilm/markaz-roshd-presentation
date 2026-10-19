"use client";

import type { SlideOf } from "@/lib/deck/types";
import { Column, Fade, SlideHeader } from "../parts";

/** چیدمان: قرارداد سه‌جانبه */
export function TripleView({ slide }: { slide: SlideOf<"triple"> }) {
  return (
    <div className="flex h-full flex-col gap-[1.1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      <Fade delay={0.1} className="text-center">
        <span className="inline-block rounded-full border border-[rgba(212,175,55,0.45)] bg-[rgba(212,175,55,0.1)] px-[1.5cqw] py-[0.4cqw] text-[1.2cqw] font-bold text-[var(--gold-300)]">
          قرارداد استقرار (سه‌جانبه)
        </span>
      </Fade>
      <div className="grid flex-1 grid-cols-3 gap-[1.2cqw] content-center">
        {slide.cols.map((c, i) => (
          <Column key={c.t} title={c.t} bullets={c.bullets} delay={0.18 + i * 0.1} />
        ))}
      </div>
    </div>
  );
}
