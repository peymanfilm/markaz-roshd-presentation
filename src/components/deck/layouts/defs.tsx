"use client";

import type { SlideOf } from "@/lib/deck/types";
import { DefCard, SlideHeader } from "../parts";

/** چیدمان: کارت‌های تعریف */
export function DefsView({ slide }: { slide: SlideOf<"defs"> }) {
  return (
    <div className="flex h-full flex-col p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      <div className="grid flex-1 grid-cols-2 gap-[1.2cqw] content-center">
        {slide.defs.map((d, i) =>
          slide.defs.length % 2 === 1 && i === slide.defs.length - 1 ? (
            <div key={d.n} className="col-span-2">
              <DefCard n={d.n} term={d.term} body={d.body} delay={0.12 + i * 0.09} />
            </div>
          ) : (
            <DefCard key={d.n} n={d.n} term={d.term} body={d.body} delay={0.12 + i * 0.09} />
          ),
        )}
      </div>
    </div>
  );
}
