"use client";

import { DotPattern } from "@/components/ui/dot-pattern";
import type { Note } from "@/lib/deck-data";
import { RichText } from "./rich-text";

/** ورود پله‌ای محتوا با CSS خالص — بدون وابستگی به JS/IntersectionObserver */
export function Fade({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`deck-fade ${className}`}
      style={delay ? { animationDelay: `${0.05 + delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

/** پس‌زمینه مشترک اسلایدها — الگوی نقطه‌ای طلایی با ماسک شعاعی */
export function SlideBackdrop() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_-5%,rgba(29,63,120,0.4),transparent_60%),radial-gradient(110%_85%_at_8%_105%,rgba(201,162,39,0.09),transparent_55%)]" />
      <DotPattern
        width={24}
        height={24}
        cx={1.3}
        cy={1.3}
        cr={1.3}
        color="rgba(212,175,55,0.5)"
        className="pointer-events-none absolute inset-0 opacity-[0.11] [mask-image:radial-gradient(75%_65%_at_50%_42%,white,transparent)]"
      />
    </>
  );
}

/** نشان دایره‌ای طلایی شماره‌ها */
export function Medallion({ n, className = "" }: { n: string; className?: string }) {
  return (
    <span
      className={`flex size-[2.25cqw] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(140deg,var(--gold-200),var(--gold-500))] text-[1.1cqw] font-black text-[#3a2c05] shadow-[0_0_18px_rgba(212,175,55,0.35)] ${className}`}
    >
      {n}
    </span>
  );
}

/** سرصفحه استاندارد اسلایدهای محتوا */
export function SlideHeader({ title, page, part }: { title: string; page: string; part?: string }) {
  return (
    <div className="relative z-10 mb-[1.5cqw] shrink-0">
      <Fade delay={0.02} className="flex items-center justify-between gap-[1cqw]">
        <div className="flex items-center gap-[0.7cqw]">
          <span className="rounded-full border border-[rgba(212,175,55,0.45)] bg-[rgba(212,175,55,0.1)] px-[1.15cqw] py-[0.3cqw] text-[1.02cqw] font-bold tracking-wide text-[var(--gold-300)]">
            {page}
          </span>
          {part ? <span className="text-[0.95cqw] text-[var(--ink-muted)]">{part}</span> : null}
        </div>
        <span className="text-[0.92cqw] text-[var(--ink-muted)]/65">
          آیین‌نامه مرکز رشد واحدهای فناور
        </span>
      </Fade>
      <Fade delay={0.08}>
        <h2 className="mt-[0.85cqw] text-[2.3cqw] font-extrabold leading-[1.4] text-[var(--ivory)]">
          {title}
        </h2>
        <div className="hairline mt-[0.75cqw] h-px w-full" />
      </Fade>
    </div>
  );
}

/** بولت لوزی طلایی */
export function Bullet({
  text,
  delay = 0,
  dense = false,
  className = "",
}: {
  text: string;
  delay?: number;
  dense?: boolean;
  className?: string;
}) {
  return (
    <Fade delay={delay} className={`flex items-start gap-[0.6cqw] ${className}`}>
      <span aria-hidden className="mt-[0.66cqw] block size-[0.45cqw] shrink-0 rotate-45 bg-[var(--gold-400)]" />
      <RichText
        text={text}
        className={
          dense
            ? "text-[1.12cqw] leading-[1.85] text-[var(--ivory)]/90"
            : "text-[1.28cqw] leading-[1.9] text-[var(--ivory)]/90"
        }
      />
    </Fade>
  );
}

/** نوار تبصره */
export function NoteStrip({ note, delay = 0 }: { note: Note; delay?: number }) {
  return (
    <Fade
      delay={delay}
      className="glass-card-soft relative rounded-[0.9cqw] border-r-2 border-r-[var(--gold-400)] px-[1.25cqw] py-[0.8cqw]"
    >
      <span className="me-[0.8cqw] inline-block rounded-md bg-[rgba(212,175,55,0.16)] px-[0.7cqw] py-[0.12cqw] align-middle text-[0.98cqw] font-bold text-[var(--gold-300)]">
        {note.l}
      </span>
      <RichText
        text={note.b}
        className="inline align-middle text-[1.15cqw] leading-[1.9] text-[var(--ivory)]/85"
      />
    </Fade>
  );
}

/** چیپ آماری */
export function StatChip({ v, l }: { v: string; l: string }) {
  return (
    <div className="glass-card-soft flex flex-col items-center rounded-[0.9cqw] px-[0.8cqw] py-[0.55cqw] text-center">
      <span className="gold-gradient-text text-[1.45cqw] font-black leading-tight">{v}</span>
      <span className="mt-[0.15cqw] text-[0.88cqw] leading-[1.5] text-[var(--ink-muted)]">{l}</span>
    </div>
  );
}
