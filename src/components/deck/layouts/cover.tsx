"use client";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
import { Ripple } from "@/components/ui/ripple";
import { ShineBorder } from "@/components/ui/shine-border";
import { deckMeta } from "@/lib/deck";
import { Fade } from "../parts";

/** چیدمان: جلد */
export function CoverView() {
  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-hidden text-center">
      <AnimatedGridPattern
        numSquares={24}
        maxOpacity={0.07}
        duration={3}
        repeatDelay={1}
        className="pointer-events-none absolute inset-0 [fill:rgba(212,175,55,0.5)]! [stroke:rgba(212,175,55,0.45)]! [mask-image:radial-gradient(80%_80%_at_50%_50%,white,transparent)]"
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40">
        <Ripple mainCircleSize={260} mainCircleOpacity={0.18} numCircles={5} />
      </div>

      {/* گروه مرکزی — لوگو، عنوان و خط جداکننده */}
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center">
        <Fade delay={0.05} className="mb-[1.4cqw]">
          <div className="relative rounded-[1.5cqw] p-px">
            <ShineBorder
              borderWidth={1.5}
              duration={10}
              shineColor={["#f1dc93", "#d4af37", "#4DCEBF", "#f1dc93"]}
              className="rounded-[1.5cqw]"
            />
            <div className="glass-card relative z-10 flex h-[7.6cqw] w-[5cqw] items-center justify-center rounded-[1.5cqw] p-[0.55cqw]">
              <img src="/logo.png" alt="نشان مؤسسه" className="size-full object-contain" />
            </div>
          </div>
        </Fade>

        <Fade delay={0.18} className="relative z-10">
          <h1 className="text-[3.4cqw] font-black leading-[1.55] text-[var(--ivory)]">
            آیین‌نامه مرکز رشد واحدهای فناور
            <span className="mt-[0.3cqw] block text-[2.9cqw]">
              <AnimatedGradientText speed={1.1} colorFrom="#f1dc93" colorTo="#b8860b">
                علوم انسانی اسلامی
              </AnimatedGradientText>
            </span>
          </h1>
          <p className="mt-[0.7cqw] text-[2.1cqw] font-bold tracking-wide text-[var(--gold-300)]">
            {deckMeta.org}
          </p>
        </Fade>

        <Fade delay={0.32} className="relative z-10">
          <div className="hairline mx-auto mt-[1.3cqw] h-px w-[34cqw]" />
        </Fade>
      </div>

      {/* کارت واحد و تاریخ — در پایین اسلاید */}
      <Fade delay={0.45} className="relative z-10 mb-[4.5cqw]">
        <div className="glass-card relative mt-[1.5cqw] overflow-hidden rounded-full px-[2.4cqw] py-[0.6cqw]">
          <BorderBeam size={70} duration={5} colorFrom="#f1dc93" colorTo="#a9861d" />
          <div className="flex items-center gap-[1.2cqw] text-[1.25cqw] text-[var(--ivory)]/90">
            <span className="font-bold text-[var(--gold-300)]">{deckMeta.dept}</span>
            <span aria-hidden className="size-[0.45cqw] rotate-45 bg-[var(--gold-400)]" />
            <span>{deckMeta.date}</span>
          </div>
        </div>
      </Fade>
    </div>
  );
}
