"use client";

import type { SlideOf } from "@/lib/deck/types";
import { DefCard, Fade, Notes, SlideHeader } from "../parts";

/** چیدمان: پنل‌های ارکان */
export function PanelsView({ slide }: { slide: SlideOf<"panels"> }) {
  return (
    <div className="flex h-full flex-col gap-[1.1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      {slide.intro ? (
        <Fade delay={0.1}>
          <p className="text-[1.45cqw] font-semibold leading-[1.8] text-[var(--ink-muted)]">{slide.intro}</p>
        </Fade>
      ) : null}
      <div className="flex flex-1 flex-col justify-center gap-[1.1cqw]">
        {slide.panels.map((p, i) => (
          <DefCard key={p.t} n={p.n} term={p.t} body={p.b} delay={0.16 + i * 0.1} />
        ))}
        {slide.notes ? <Notes notes={slide.notes} delay={0.32} /> : null}
      </div>
    </div>
  );
}
