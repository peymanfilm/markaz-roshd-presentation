"use client";

import { ArrowLeft } from "lucide-react";
import type { SlideOf } from "@/lib/deck/types";
import { Bullet, Fade, SlideHeader } from "../parts";

/** چیدمان: گردش‌کار (مراحل) */
export function FlowView({ slide }: { slide: SlideOf<"flow"> }) {
  const four = slide.steps.length >= 4;
  return (
    <div className="flex h-full flex-col gap-[0.9cqw] p-[2.8cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      {slide.intro ? (
        <Fade delay={0.1}>
          <p className="glass-card-soft rounded-[0.8cqw] px-[1.1cqw] py-[0.55cqw] text-[1.12cqw] leading-[1.8] text-[var(--ink-muted)]">
            {slide.intro}
          </p>
        </Fade>
      ) : null}
      <div className="flex flex-1 items-stretch gap-[0.55cqw]">
        {slide.steps.map((st, i) => (
          <div key={st.t} className="flex min-w-0 flex-1 items-stretch gap-[0.55cqw]">
            <Fade
              delay={0.14 + i * 0.09}
              className="glass-card flex min-w-0 flex-1 flex-col rounded-[1cqw] p-[1cqw]"
            >
              <p
                className={
                  four
                    ? "border-b border-[rgba(212,175,55,0.25)] pb-[0.5cqw] text-[1.05cqw] font-extrabold leading-[1.65] text-[var(--gold-200)]"
                    : "border-b border-[rgba(212,175,55,0.25)] pb-[0.55cqw] text-[1.35cqw] font-extrabold leading-[1.65] text-[var(--gold-200)]"
                }
              >
                {st.t}
              </p>
              <div className={`flex flex-col ${four ? "gap-[0.55cqw] pt-[0.6cqw]" : "gap-[0.7cqw] pt-[0.75cqw]"}`}>
                {st.bullets.map((b, j) => (
                  <Bullet key={j} text={b} delay={0.24 + i * 0.09 + j * 0.05} dense={four} />
                ))}
              </div>
            </Fade>
            {i < slide.steps.length - 1 ? (
              <div aria-hidden className="flex items-center">
                <ArrowLeft className="size-[1.15cqw] shrink-0 text-[var(--gold-400)]" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
