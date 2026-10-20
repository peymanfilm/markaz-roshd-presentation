"use client";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Particles } from "@/components/ui/particles";
import { ShineBorder } from "@/components/ui/shine-border";
import type { SlideOf } from "@/lib/deck/types";
import { Fade } from "../parts";

/** چیدمان: سرصفحه فصل */
export function SectionView({ slide }: { slide: SlideOf<"section"> }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden text-center">
      <Particles
        className="absolute inset-0 z-0 h-full w-full"
        quantity={110}
        size={1.1}
        staticity={60}
        ease={60}
        color="#e8c766"
      />
      <div className="relative z-10 max-w-[86cqw] rounded-[2.4cqw] p-px">
        <ShineBorder
          borderWidth={1.5}
          duration={10}
          shineColor={["#f1dc93", "#d4af37", "#4DCEBF", "#f1dc93"]}
          className="rounded-[2.4cqw]"
        />
        <div className="glass-card relative z-10 flex flex-col items-center rounded-[2.4cqw] px-[5cqw] py-[3.2cqw]">
          <Fade>
            <span className="rounded-full border border-[rgba(212,175,55,0.32)] bg-[rgba(212,175,55,0.09)] px-[1.6cqw] py-[0.5cqw]">
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
      </div>
    </div>
  );
}
