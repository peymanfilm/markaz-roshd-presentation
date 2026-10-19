"use client";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import type { SlideOf } from "@/lib/deck/types";
import { Fade } from "../parts";

/** چیدمان: سرصفحه فصل */
export function SectionView({ slide }: { slide: SlideOf<"section"> }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden text-center">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[4cqw] left-0 select-none text-[17cqw] font-black leading-none text-transparent"
        style={{ WebkitTextStroke: "1.5px rgba(212,175,55,0.14)" }}
      >
        {slide.kicker}
      </span>
      <Fade>
        <span className="glass-card rounded-full px-[1.6cqw] py-[0.5cqw]">
          <AnimatedShinyText className="text-[1.3cqw] font-bold text-[var(--gold-200)]">
            {slide.kicker}
          </AnimatedShinyText>
        </span>
      </Fade>
      <Fade delay={0.12}>
        <h2 className="mt-[1.2cqw] text-[4cqw] font-black leading-[1.4]">
          <AnimatedGradientText speed={1.4} colorFrom="#f1dc93" colorTo="#b8860b">
            {slide.title}
          </AnimatedGradientText>
        </h2>
      </Fade>
      {slide.sub ? (
        <Fade delay={0.24}>
          <p className="mt-[1cqw] max-w-[70cqw] text-[1.5cqw] leading-[1.9] text-[var(--ink-muted)]">
            {slide.sub}
          </p>
        </Fade>
      ) : null}
      <Fade delay={0.34}>
        <div className="hairline mx-auto mt-[1.6cqw] h-px w-[26cqw]" />
      </Fade>
    </div>
  );
}
