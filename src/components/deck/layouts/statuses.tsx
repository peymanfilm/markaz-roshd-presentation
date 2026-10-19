"use client";

import type { SlideOf } from "@/lib/deck/types";
import { RichText } from "../rich-text";
import { Bullet, Fade, NoteStrip, SlideHeader } from "../parts";

/** چیدمان: تصمیم شورا */
export function StatusesView({ slide }: { slide: SlideOf<"statuses"> }) {
  return (
    <div className="flex h-full flex-col gap-[1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      <Fade delay={0.1} className="glass-card rounded-[1cqw] p-[1.3cqw]">
        <p className="text-[1.4cqw] font-extrabold text-[var(--gold-200)]">۱. وظایف شورای مرکز رشد:</p>
        <Bullet text={slide.listen} delay={0.18} className="mt-[0.6cqw]" />
        <p className="mt-[0.7cqw] text-[1.3cqw] font-bold leading-[1.8] text-[var(--ivory)]/90">
          {slide.intro}
        </p>
      </Fade>
      <div className="grid flex-1 grid-cols-2 gap-[0.9cqw] content-center">
        {slide.statuses.map((s, i) => (
          <Fade
            key={s}
            delay={0.22 + i * 0.08}
            className="glass-card-soft flex items-start gap-[0.75cqw] rounded-[0.9cqw] px-[1.15cqw] py-[0.8cqw]"
          >
            <span aria-hidden className="mt-[0.68cqw] block size-[0.5cqw] shrink-0 rotate-45 bg-[var(--gold-400)]" />
            <RichText text={s} className="text-[1.3cqw] font-semibold leading-[1.85] text-[var(--ivory)]/92" />
          </Fade>
        ))}
      </div>
      <NoteStrip note={slide.clerk} delay={0.5} />
    </div>
  );
}
