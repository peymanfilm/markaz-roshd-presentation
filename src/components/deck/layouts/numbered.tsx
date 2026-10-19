"use client";

import type { SlideOf } from "@/lib/deck/types";
import { Fade, ListCard, SlideHeader } from "../parts";

/** چیدمان: لیست شماره‌دار */
export function NumberedView({ slide }: { slide: SlideOf<"numbered"> }) {
  return (
    <div className="flex h-full flex-col p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      {slide.sub ? (
        <Fade delay={0.1}>
          <p className="mb-[0.9cqw] text-[1.4cqw] font-semibold text-[var(--ink-muted)]">{slide.sub}</p>
        </Fade>
      ) : null}
      <div className="flex flex-1 flex-col justify-center gap-[0.85cqw]">
        {slide.items.map((it, i) => (
          <ListCard key={i} n={`${["۱", "۲", "۳", "۴", "۵"][i]}`} text={it.t} delay={0.12 + i * 0.08} />
        ))}
      </div>
    </div>
  );
}
