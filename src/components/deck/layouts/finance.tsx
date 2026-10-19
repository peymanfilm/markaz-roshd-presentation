"use client";

import type { SlideOf } from "@/lib/deck/types";
import { RichText } from "../rich-text";
import { BulletGrid, Fade, SlideHeader } from "../parts";

/** چیدمان: منابع مالی */
export function FinanceView({ slide }: { slide: SlideOf<"finance"> }) {
  return (
    <div className="flex h-full flex-col gap-[0.9cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      <Fade delay={0.1} className="glass-card rounded-[1cqw] p-[1.15cqw]">
        <RichText text={slide.p1} className="text-[1.28cqw] leading-[1.95] text-[var(--ivory)]/90" />
      </Fade>
      <Fade delay={0.2} className="glass-card-soft flex flex-1 flex-col justify-center gap-[0.7cqw] rounded-[1cqw] p-[1.15cqw]">
        <p className="text-[1.3cqw] font-extrabold text-[var(--gold-200)]">{slide.sourcesIntro}</p>
        <BulletGrid items={slide.sources} delay={0.28} />
      </Fade>
      <Fade delay={0.4} className="glass-card rounded-[1cqw] border-r-2 border-r-[var(--gold-400)] p-[1.05cqw]">
        <RichText text={slide.p3} className="text-[1.22cqw] leading-[1.9] text-[var(--ivory)]/90" />
      </Fade>
    </div>
  );
}
