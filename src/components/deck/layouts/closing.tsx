"use client";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Marquee } from "@/components/ui/marquee";
import { Ripple } from "@/components/ui/ripple";
import type { SlideOf } from "@/lib/deck/types";
import { Fade } from "../parts";

/** رنگ هر واژهٔ عربی — مطابق اسلاید مرجع 41-payan */
const TONE: Record<SlideOf<"closing">["arabic"][number]["tone"], string> = {
  gold: "text-[#f0d878]",
  teal: "text-[#63ddd0]",
  cream: "text-[#fff7bd]",
  lilac: "text-[#d7b8ff]",
};

/** چیدمان: پایان */
export function ClosingView({ slide }: { slide: SlideOf<"closing"> }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden text-center">
      <Ripple mainCircleSize={300} mainCircleOpacity={0.2} numCircles={7} />
      <Fade className="relative z-10 w-full px-[6cqw]">
        <div className="glass-card mx-auto flex max-w-[88cqw] flex-col items-center rounded-[2.4cqw] px-[5cqw] py-[3cqw]">
          <h2 className="font-arabic text-[3.5cqw] font-bold leading-[1.75]">
            {slide.arabic.map((w, i) => (
              <span key={i} className={`ms-[0.22em] inline-block ${TONE[w.tone]}`}>
                {w.t}
              </span>
            ))}
          </h2>
          <Fade delay={0.14}>
            <p className="mt-[1.1cqw] max-w-[72cqw] text-[1.45cqw] font-semibold leading-[1.95] text-[var(--ivory)]/88">
              {slide.meaning}
            </p>
          </Fade>
          <Fade delay={0.24}>
            <div className="hairline mx-auto mt-[1.6cqw] h-px w-[26cqw]" />
          </Fade>
        </div>
      </Fade>
      <Fade
        delay={0.34}
        className="relative z-10 mt-[1.5cqw] w-full px-[6cqw]"
      >
        <p className="mx-auto max-w-[88cqw] text-center text-[1.2cqw] font-bold">
          <AnimatedGradientText speed={1} colorFrom="#f1dc93" colorTo="#4dcebf">
            {slide.credit.org} / {slide.credit.term}
          </AnimatedGradientText>
        </p>
      </Fade>
      <Fade
        delay={0.5}
        className="absolute bottom-[2.6cqw] left-0 right-0 z-10 [mask-image:linear-gradient(90deg,transparent,white_12%,white_88%,transparent)]"
      >
        <Marquee
          repeat={8}
          pauseOnHover
          className="deck-marquee [--duration:18s] [--gap:0px]"
        >
          <span className="flex items-center text-[1.05cqw] text-[var(--ink-muted)]">
            <span className="whitespace-nowrap">
              رئیس محترم جامعه المصطفی العالمیه، حضرت آیت الله دکتر عباسی<span className="text-[0.7cqw]">(دام توفیقاته)</span> و اعضای محترم هیئـت رئیسـه<span className="text-[0.7cqw]">(زید عزهم)</span>، از توجه، همراهی و حمایت شما سپاسگزاریم.
            </span>
            <span aria-hidden className="mx-[0.8cqw] size-[0.4cqw] rotate-45 bg-[var(--gold-500)]/70" />
          </span>
        </Marquee>
      </Fade>
    </div>
  );
}
