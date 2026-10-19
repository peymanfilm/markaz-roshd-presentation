"use client";

import { ShineBorder } from "@/components/ui/shine-border";
import type { SlideOf } from "@/lib/deck/types";
import { RichText } from "../rich-text";

/** چیدمان: بیانات رهبری */
export function LeadershipView({ slide }: { slide: SlideOf<"leadership"> }) {
  return (
    <div className="relative flex h-full w-full items-stretch overflow-hidden">
      <div className="absolute inset-0 animate-[gradient_8s_linear_infinite] bg-[linear-gradient(120deg,#04091a,#0a1730,#1d3f78,#071127,#04091a)] bg-[length:300%_300%] opacity-90" />
      <img src="/agha.png" alt="رهبر" className="absolute bottom-[-10cqw] left-[-6cqw] h-[130%] w-[84%] object-contain" />
      <div className="relative z-10 flex flex-1 flex-col justify-center gap-[1.1cqw] px-[3cqw] py-[2cqw] text-right">
        <div className="flex items-baseline gap-[0.6cqw]">
          <span className="text-[1.1cqw] font-semibold text-[var(--gold-300)]">{slide.name}</span>
          <span className="text-[0.9cqw] text-[var(--gold-400)]/70">{slide.honorific}</span>
        </div>
        <div className="h-[0.12cqw] w-[14cqw] bg-gradient-to-l from-[var(--gold-400)] to-transparent" />
        <blockquote className="relative max-w-[45%] rounded-[1.2cqw] p-px">
          <ShineBorder
            borderWidth={1.5}
            duration={9}
            shineColor={["#f1dc93", "#d4af37", "#4DCEBF", "#f1dc93"]}
            className="rounded-[1.2cqw]"
          />
          <div className="relative z-10 rounded-[1.2cqw] border border-[rgba(212,175,55,0.14)] bg-[rgba(10,16,42,0.6)] p-[1.2cqw] backdrop-blur">
            <p className="border-r-2 border-[rgba(77,206,191,0.45)] pr-[1.2cqw] text-[1.3cqw] font-medium leading-[2] text-white/95">
              <RichText text={slide.lead} />
            </p>
            <span
              aria-hidden
              className="my-[0.7cqw] block h-px w-full bg-gradient-to-l from-[rgba(77,206,191,0.35)] to-transparent"
            />
            <p className="border-r-2 border-[rgba(77,206,191,0.25)] pr-[1.2cqw] text-[1.12cqw] leading-[1.95] text-white/80">
              <RichText text={slide.close} />
            </p>
            <span className="mt-[0.9cqw] inline-flex items-center gap-[0.5cqw] self-start rounded-full border border-[rgba(212,175,55,0.16)] bg-[rgba(212,175,55,0.06)] px-[1cqw] py-[0.3cqw] text-[0.85cqw] text-[var(--gold-400)]">
              {slide.source}
            </span>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
