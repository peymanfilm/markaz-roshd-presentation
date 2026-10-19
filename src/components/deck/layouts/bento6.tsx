"use client";

import { MagicCard } from "@/components/ui/magic-card";
import type { SlideOf } from "@/lib/deck/types";
import { Fade, SlideHeader } from "../parts";

/** چیدمان: قلمروهای شش‌گانه */
export function Bento6View({ slide }: { slide: SlideOf<"bento6"> }) {
  return (
    <div className="flex h-full flex-col gap-[1.2cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      <Fade delay={0.1}>
        <p className="text-[1.45cqw] font-semibold leading-[1.8] text-[var(--ink-muted)]">{slide.intro}</p>
      </Fade>
      <div className="grid flex-1 grid-cols-3 gap-[1.2cqw] content-center">
        {slide.items.map((it, i) => (
          <Fade key={it} delay={0.16 + i * 0.07}>
            <MagicCard
              className="h-full rounded-[1.1cqw]"
              gradientFrom="rgba(212,175,55,0.9)"
              gradientTo="rgba(169,134,29,0.9)"
              gradientColor="rgba(212,175,55,0.07)"
              gradientOpacity={1}
              gradientSize={260}
            >
              <div className="flex h-full flex-col items-center justify-center gap-[0.5cqw] p-[1.5cqw] text-center">
                <span className="gold-gradient-text text-[2.5cqw] font-black leading-none">
                  {["۱", "۲", "۳", "۴", "۵", "۶"][i]}
                </span>
                <span className="text-[1.42cqw] font-extrabold leading-[1.6] text-[var(--ivory)]">{it}</span>
              </div>
            </MagicCard>
          </Fade>
        ))}
      </div>
    </div>
  );
}
