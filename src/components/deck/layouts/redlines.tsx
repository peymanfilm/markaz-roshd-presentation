"use client";

import type { SlideOf } from "@/lib/deck/types";
import { AlertCard, Fade, SlideHeader } from "../parts";

/** چیدمان: خطوط قرمز */
export function RedlinesView({ slide }: { slide: SlideOf<"redlines"> }) {
  return (
    <div className="flex h-full flex-col gap-[1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      {slide.intro ? (
        <Fade delay={0.1}>
          <p className="text-[1.35cqw] font-semibold leading-[1.8] text-[var(--ink-muted)]">{slide.intro}</p>
        </Fade>
      ) : null}
      <div className="flex flex-1 flex-col justify-center gap-[0.85cqw]">
        {slide.items.map((it, i) => (
          <AlertCard key={it.n} n={it.n} term={it.t} body={it.b} delay={0.16 + i * 0.1} />
        ))}
      </div>
    </div>
  );
}
