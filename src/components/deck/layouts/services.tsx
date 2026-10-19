"use client";

import { MagicCard } from "@/components/ui/magic-card";
import type { SlideOf } from "@/lib/deck/types";
import { RichText } from "../rich-text";
import { Fade, Medallion, Notes, SlideHeader } from "../parts";

/** چیدمان: سبد خدمات حمایتی */
export function ServicesView({ slide }: { slide: SlideOf<"services"> }) {
  return (
    <div className="flex h-full flex-col gap-[1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      {slide.intro ? (
        <Fade delay={0.1}>
          <p className="glass-card-soft rounded-[0.8cqw] px-[1.1cqw] py-[0.55cqw] text-[1.15cqw] leading-[1.85] text-[var(--ivory)]/85">
            <RichText text={slide.intro} />
          </p>
        </Fade>
      ) : null}
      <div className="flex flex-1 flex-col justify-center gap-[0.8cqw]">
        {slide.items.map((it, i) => (
          <Fade key={it.n} delay={0.16 + i * 0.09}>
            <MagicCard
              className="rounded-[1cqw]"
              gradientFrom="rgba(212,175,55,0.9)"
              gradientTo="rgba(169,134,29,0.9)"
              gradientColor="rgba(212,175,55,0.06)"
              gradientOpacity={1}
              gradientSize={280}
            >
              <div className="flex items-start gap-[0.95cqw] p-[1.05cqw]">
                <Medallion n={it.n} className="size-[2cqw] text-[1cqw]" />
                <div>
                  <p className="text-[1.3cqw] font-extrabold leading-[1.6] text-[var(--gold-200)]">{it.t}</p>
                  <RichText
                    text={it.b}
                    className="mt-[0.25cqw] block text-[1.18cqw] leading-[1.9] text-[var(--ivory)]/88"
                  />
                </div>
              </div>
            </MagicCard>
          </Fade>
        ))}
        {slide.notes ? <Notes notes={slide.notes} delay={0.4} /> : null}
      </div>
    </div>
  );
}
