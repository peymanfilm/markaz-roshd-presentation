"use client";

import { Check, ShieldAlert } from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import type { Chip, Note } from "@/lib/deck/types";
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

/** نشان لوگوی مؤسسه — گوشهٔ بالای راست همهٔ اسلایدها */
export function DeckLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex shrink-0 items-center justify-center ${className}`}>
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[0.65cqw] border border-[rgba(212,175,55,0.28)] bg-[rgba(7,17,39,0.45)] p-[0.16cqw]">
        <img src="/logo.png" alt="" aria-hidden className="size-full object-contain" />
      </div>
    </div>
  );
}

/** سرصفحه استاندارد اسلایدهای محتوا */
export function SlideHeader({ title, page, part }: { title: string; page: string; part?: string }) {
  return (
    <div className="relative z-10 mb-[1.5cqw] shrink-0">
      <Fade delay={0.02} className="flex items-center justify-between gap-[1cqw]">
        <div className="flex items-center gap-[0.7cqw]">
          <DeckLogo className="h-[2.9cqw] w-[1.9cqw]" />
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

/* ───────────────────────── کارت‌های مشترک اسلایدها ───────────────────────── */

/** کارت تعریف/پنل — نشان + عنوان + متن */
export function DefCard({
  n,
  term,
  body,
  delay = 0,
  soft = false,
}: {
  n?: string;
  term: string;
  body: string;
  delay?: number;
  soft?: boolean;
}) {
  return (
    <Fade
      delay={delay}
      className={`${soft ? "glass-card-soft" : "glass-card"} flex items-start gap-[0.95cqw] rounded-[1.1cqw] p-[1.35cqw]`}
    >
      {n ? <Medallion n={n} /> : null}
      <div className="min-w-0">
        <p className="text-[1.45cqw] font-extrabold leading-[1.6] text-[var(--gold-200)]">{term}</p>
        <RichText
          text={body}
          className="mt-[0.3cqw] block text-[1.28cqw] leading-[1.95] text-[var(--ivory)]/88"
        />
      </div>
    </Fade>
  );
}

/** کارت فهرستی — نشان + متن */
export function ListCard({ n, text, delay = 0 }: { n: string; text: string; delay?: number }) {
  return (
    <Fade
      delay={delay}
      className="glass-card-soft flex items-center gap-[0.95cqw] rounded-[0.9cqw] px-[1.2cqw] py-[0.8cqw]"
    >
      <Medallion n={n} className="size-[1.95cqw] text-[0.98cqw]" />
      <RichText text={text} className="text-[1.28cqw] leading-[1.85] text-[var(--ivory)]/90" />
    </Fade>
  );
}

/** کارت چک‌لیست — تیک + متن */
export function CheckCard({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <Fade
      delay={delay}
      className="glass-card-soft flex items-start gap-[0.9cqw] rounded-[0.9cqw] px-[1.2cqw] py-[0.85cqw]"
    >
      <span className="mt-[0.15cqw] flex size-[1.9cqw] shrink-0 items-center justify-center rounded-full bg-[rgba(212,175,55,0.18)]">
        <Check className="size-[1.1cqw] text-[var(--gold-300)]" strokeWidth={3} />
      </span>
      <RichText
        text={text}
        className="text-[1.3cqw] font-medium leading-[1.85] text-[var(--ivory)]/90"
      />
    </Fade>
  );
}

/** کارت هشدار — خطوط قرمز با نشان قرمز */
export function AlertCard({
  n,
  term,
  body,
  delay = 0,
}: {
  n: string;
  term: string;
  body: string;
  delay?: number;
}) {
  return (
    <Fade
      delay={delay}
      className="glass-card-soft flex items-start gap-[0.95cqw] rounded-[1cqw] border-r-2 border-r-[#e05252] p-[1.2cqw]"
    >
      <span className="mt-[0.1cqw] flex size-[2cqw] shrink-0 items-center justify-center rounded-full bg-[rgba(224,82,82,0.14)]">
        <ShieldAlert className="size-[1.15cqw] text-[#ff9090]" />
      </span>
      <div className="min-w-0">
        <p className="text-[1.32cqw] font-extrabold leading-[1.6] text-[var(--gold-200)]">
          {n}. {term}
        </p>
        <RichText
          text={body}
          className="mt-[0.3cqw] block text-[1.22cqw] leading-[1.95] text-[var(--ivory)]/88"
        />
      </div>
    </Fade>
  );
}

/** کارت عنوان + متن */
export function TextCard({
  title,
  body,
  delay = 0,
}: {
  title: string;
  body: string;
  delay?: number;
}) {
  return (
    <Fade delay={delay} className="glass-card rounded-[1cqw] p-[1.2cqw]">
      <p className="text-[1.3cqw] font-extrabold leading-[1.6] text-[var(--gold-200)]">{title}</p>
      <RichText
        text={body}
        className="mt-[0.4cqw] block text-[1.22cqw] leading-[1.95] text-[var(--ivory)]/88"
      />
    </Fade>
  );
}

/** ستون عنوان + بولت — قرارداد سه‌جانبه و پایش */
export function Column({
  title,
  bullets,
  delay = 0,
}: {
  title: string;
  bullets: string[];
  delay?: number;
}) {
  return (
    <Fade delay={delay} className="glass-card flex flex-col rounded-[1.1cqw] p-[1.25cqw]">
      <p className="border-b border-[rgba(212,175,55,0.25)] pb-[0.6cqw] text-[1.25cqw] font-extrabold leading-[1.65] text-[var(--gold-200)]">
        {title}
      </p>
      <div className="mt-[0.7cqw] flex flex-col gap-[0.7cqw]">
        {bullets.map((b, j) => (
          <Bullet key={j} text={b} delay={delay + 0.1 + j * 0.06} dense />
        ))}
      </div>
    </Fade>
  );
}

/** شبکه دو ستونی بولت‌ها */
export function BulletGrid({ items, delay = 0 }: { items: string[]; delay?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-[1.4cqw] gap-y-[0.55cqw]">
      {items.map((it, i) => (
        <Bullet key={i} text={it} delay={delay + i * 0.06} dense />
      ))}
    </div>
  );
}

/** ردیف نوارهای تبصره */
export function Notes({ notes, delay = 0 }: { notes: Note[]; delay?: number }) {
  return (
    <div className="flex flex-col gap-[0.7cqw]">
      {notes.map((nt, i) => (
        <NoteStrip key={nt.l} note={nt} delay={delay + i * 0.08} />
      ))}
    </div>
  );
}

const STAT_COLS = { 4: "grid-cols-4", 5: "grid-cols-5" } as const;

/** ردیف چیپ‌های آماری */
export function Stats({
  chips,
  cols = 5,
  delay = 0,
}: {
  chips: Chip[];
  cols?: 4 | 5;
  delay?: number;
}) {
  return (
    <Fade delay={delay} className={`grid ${STAT_COLS[cols]} gap-[0.9cqw]`}>
      {chips.map((c) => (
        <StatChip key={c.l} v={c.v} l={c.l} />
      ))}
    </Fade>
  );
}
