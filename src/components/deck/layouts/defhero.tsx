"use client";

import type { SlideOf } from "@/lib/deck/types";
import { DefCard, NoteStrip, SlideHeader, Stats } from "../parts";

/** چیدمان: هسته/واحد فناور + اعداد کلیدی */
export function DefHeroView({ slide }: { slide: SlideOf<"defhero"> }) {
  return (
    <div className="flex h-full flex-col gap-[1.1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part="بخش ۲ از ۳" />
      <div className="grid flex-1 grid-cols-2 gap-[1.2cqw] content-center">
        {slide.defs.map((d, i) => (
          <DefCard key={d.n} n={d.n} term={d.term} body={d.body} delay={0.1 + i * 0.1} />
        ))}
      </div>
      {slide.stats ? <Stats chips={slide.stats} cols={5} delay={0.3} /> : null}
      {slide.note ? <NoteStrip note={slide.note} delay={0.4} /> : null}
    </div>
  );
}
