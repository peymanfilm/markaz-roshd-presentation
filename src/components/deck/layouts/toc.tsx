"use client";

import type { SlideOf } from "@/lib/deck/types";
import { Fade, Medallion, SlideHeader } from "../parts";

/** چیدمان: فهرست مطالب */
export function TocView({ slide }: { slide: SlideOf<"toc"> }) {
  return (
    <div className="flex h-full flex-col p-[3cqw]">
      <SlideHeader title="فهرست مطالب" page="آیین‌نامه" part="ماده‌های ۱ تا ۱۳" />
      <div className="grid flex-1 grid-cols-2 gap-x-[1.4cqw] gap-y-[0.85cqw] content-center">
        {slide.items.map((it, i) => (
          <Fade
            key={it.n}
            delay={0.1 + i * 0.05}
            className="glass-card-soft flex items-center gap-[0.85cqw] rounded-[0.8cqw] px-[1cqw] py-[0.62cqw]"
          >
            <Medallion n={it.n} className="size-[1.9cqw] text-[0.95cqw]" />
            <span className="flex-1 text-[1.18cqw] font-semibold leading-[1.55] text-[var(--ivory)]/92">
              {it.t}
            </span>
            {it.chapter ? (
              <span className="rounded-full border border-[rgba(212,175,55,0.35)] px-[0.65cqw] py-[0.12cqw] text-[0.8cqw] text-[var(--gold-300)]">
                {it.chapter}
              </span>
            ) : null}
          </Fade>
        ))}
      </div>
    </div>
  );
}
