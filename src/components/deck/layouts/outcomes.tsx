"use client";

import type { SlideOf } from "@/lib/deck/types";
import { BulletGrid, Column, Fade, SlideHeader } from "../parts";

/** چیدمان: پایش و تعیین تکلیف */
export function OutcomesView({ slide }: { slide: SlideOf<"outcomes"> }) {
  return (
    <div className="flex h-full flex-col gap-[1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      <div className="grid grid-cols-2 gap-[1.2cqw]">
        {slide.blocks.map((b, i) => (
          <Column key={b.t} title={b.t} bullets={b.bullets} delay={0.12 + i * 0.1} />
        ))}
      </div>
      <Fade delay={0.34} className="glass-card flex flex-1 flex-col justify-center gap-[0.8cqw] rounded-[1cqw] p-[1.2cqw]">
        <p className="text-[1.25cqw] font-extrabold leading-[1.7] text-[var(--gold-200)]">
          {slide.outcomesIntro}
        </p>
        <BulletGrid items={slide.outcomes} delay={0.42} />
      </Fade>
    </div>
  );
}
