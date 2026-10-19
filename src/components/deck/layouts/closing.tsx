"use client";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Marquee } from "@/components/ui/marquee";
import { Meteors } from "@/components/ui/meteors";
import { Ripple } from "@/components/ui/ripple";
import { deckMeta } from "@/lib/deck";
import toc from "@/lib/deck/slides/04-toc";
import { Fade } from "../parts";

/** چیدمان: پایان */
export function ClosingView() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden text-center">
      <Ripple mainCircleSize={300} mainCircleOpacity={0.2} numCircles={7} />
      <Meteors number={8} />
      <Fade className="relative z-10">
        <span className="glass-card inline-block rounded-full px-[1.5cqw] py-[0.45cqw]">
          <AnimatedShinyText className="text-[1.15cqw] font-bold text-[var(--gold-200)]">
            آیین‌نامه مرکز رشد واحدهای فناور علوم انسانی اسلامی
          </AnimatedShinyText>
        </span>
      </Fade>
      <Fade delay={0.14} className="relative z-10">
        <h2 className="mt-[1.3cqw] text-[4.2cqw] font-black leading-[1.4]">
          <AnimatedGradientText speed={1.2} colorFrom="#f1dc93" colorTo="#b8860b">
            با سپاس از توجه شما
          </AnimatedGradientText>
        </h2>
      </Fade>
      <Fade delay={0.26} className="relative z-10">
        <p className="mt-[0.9cqw] text-[1.5cqw] font-bold text-[var(--ivory)]/85">
          {deckMeta.dept} — {deckMeta.org}
        </p>
        <p className="mt-[0.35cqw] text-[1.1cqw] text-[var(--ink-muted)]">{deckMeta.date}</p>
      </Fade>
      <Fade
        delay={0.4}
        className="absolute bottom-[2.6cqw] left-0 right-0 z-10 [mask-image:linear-gradient(90deg,transparent,white_12%,white_88%,transparent)]"
      >
        <Marquee pauseOnHover className="[--duration:30s] [--gap:1.6cqw]">
          {[...toc.items, ...toc.items].map((it, i) => (
            <span key={i} className="flex items-center gap-[1.6cqw] text-[1.05cqw] text-[var(--ink-muted)]">
              <span className="whitespace-nowrap">
                ماده {it.n}: {it.t}
              </span>
              <span aria-hidden className="size-[0.4cqw] rotate-45 bg-[var(--gold-500)]/70" />
            </span>
          ))}
        </Marquee>
      </Fade>
    </div>
  );
}
