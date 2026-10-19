"use client";

import { Timer } from "lucide-react";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { ShineBorder } from "@/components/ui/shine-border";
import type { SlideOf } from "@/lib/deck/types";
import { RichText } from "../rich-text";
import { Fade, SlideHeader } from "../parts";

/** چیدمان: ۹ شیوه‌نامه */
export function ProtocolsView({ slide }: { slide: SlideOf<"protocols"> }) {
  return (
    <div className="flex h-full flex-col gap-[0.9cqw] p-[2.8cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      <Fade delay={0.08}>
        <span className="glass-card inline-block rounded-full px-[1.4cqw] py-[0.4cqw]">
          <AnimatedShinyText className="text-[1.1cqw] font-bold text-[var(--gold-200)]">
            {slide.kicker}
          </AnimatedShinyText>
        </span>
      </Fade>
      <Fade delay={0.14}>
        <p className="glass-card-soft rounded-[0.8cqw] px-[1.1cqw] py-[0.55cqw] text-[1.15cqw] leading-[1.85] text-[var(--ivory)]/88">
          <RichText text={slide.intro} />
        </p>
      </Fade>
      <div className="grid flex-1 grid-cols-3 gap-[0.8cqw] content-center">
        {slide.items.map((it, i) => (
          <Fade
            key={i}
            delay={0.2 + i * 0.05}
            className="glass-card-soft flex items-start gap-[0.6cqw] rounded-[0.85cqw] p-[0.9cqw]"
          >
            <span aria-hidden className="mt-[0.6cqw] block size-[0.42cqw] shrink-0 rotate-45 bg-[var(--gold-400)]" />
            <RichText text={it} className="text-[1.02cqw] leading-[1.8] text-[var(--ivory)]/90" />
          </Fade>
        ))}
      </div>
      <Fade delay={0.5} className="flex justify-center">
        <div className="relative rounded-full px-[1.8cqw] py-[0.6cqw]">
          <ShineBorder borderWidth={1.2} duration={6} shineColor={["#f1dc93", "#c9a227"]} className="rounded-full" />
          <div className="relative flex items-center gap-[0.7cqw] text-[1.2cqw] font-bold text-[var(--gold-300)]">
            <Timer className="size-[1.25cqw]" />
            {slide.deadline}
          </div>
        </div>
      </Fade>
    </div>
  );
}
