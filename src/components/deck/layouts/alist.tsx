"use client";

import { AnimatedList } from "@/components/ui/animated-list";
import type { SlideOf } from "@/lib/deck/types";
import { Fade, Medallion, SlideHeader } from "../parts";
import { RichText } from "../rich-text";

/** ارقام فارسی نشان‌ها */
const DIGITS = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸"];

/** چیدمان: فهرست متحرک — آیتم‌ها یکی‌یکی با انیمیشن فنری ظاهر می‌شوند */
export function AnimatedListView({ slide }: { slide: SlideOf<"alist"> }) {
  return (
    <div className="flex h-full flex-col p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      {slide.sub ? (
        <Fade delay={0.1}>
          <p className="mb-[0.9cqw] text-[1.4cqw] font-semibold text-[var(--ink-muted)]">{slide.sub}</p>
        </Fade>
      ) : null}
      <AnimatedList
        delay={520}
        reverse={false}
        transition={{ type: "spring", stiffness: 170, damping: 28 }}
        className="flex flex-1 flex-col items-stretch justify-center gap-[0.85cqw]"
      >
        {slide.items.map((it, i) => {
          const text = typeof it === "string" ? it : it.t;
          return (
            <div
              key={i}
              className="glass-card-soft flex items-center gap-[0.95cqw] rounded-[0.9cqw] px-[1.2cqw] py-[0.8cqw]"
            >
              <Medallion n={DIGITS[i]} className="size-[1.95cqw] text-[0.98cqw]" />
              <RichText text={text} className="text-[1.28cqw] leading-[1.85] text-[var(--ivory)]/90" />
            </div>
          );
        })}
      </AnimatedList>
    </div>
  );
}
