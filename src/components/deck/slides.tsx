"use client";

import {
  AnimatedGradientText,
} from "@/components/ui/animated-gradient-text";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { MagicCard } from "@/components/ui/magic-card";
import { Meteors } from "@/components/ui/meteors";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Ripple } from "@/components/ui/ripple";
import { ShineBorder } from "@/components/ui/shine-border";
import {
  ArrowLeft,
  BookOpenText,
  Check,
  Compass,
  Feather,
  Landmark,
  Scale,
  ShieldAlert,
  Sprout,
  Timer,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import type { SlideData } from "@/lib/deck-data";
import { deckMeta, slides } from "@/lib/deck-data";
import {
  Bullet,
  Medallion,
  NoteStrip,
  SlideBackdrop,
  SlideHeader,
  StatChip,
} from "./parts";
import { RichText } from "./rich-text";

/* ───────────────────────────── جلد ───────────────────────────── */
function Cover() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden text-center">
      <AnimatedGridPattern
        numSquares={24}
        maxOpacity={0.07}
        duration={3}
        repeatDelay={1}
        className="pointer-events-none absolute inset-0 [fill:rgba(212,175,55,0.5)]! [stroke:rgba(212,175,55,0.45)]! [mask-image:radial-gradient(80%_80%_at_50%_50%,white,transparent)]"
      />
      <Meteors number={9} />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40">
        <Ripple mainCircleSize={260} mainCircleOpacity={0.18} numCircles={5} />
      </div>

      <BlurFade delay={0.05} className="relative z-10 mb-[1.2cqw]">
        <div className="relative flex h-[9cqw] w-[9cqw] items-center justify-center">
          <OrbitingCircles duration={26} radius={110} path={false} speed={0.7}>
            <BookOpenText className="size-[1.6cqw] text-[var(--gold-300)]" />
            <Scale className="size-[1.6cqw] text-[var(--gold-400)]" />
            <Landmark className="size-[1.6cqw] text-[var(--gold-300)]" />
          </OrbitingCircles>
          <OrbitingCircles duration={34} radius={150} reverse path={false} speed={0.6}>
            <Users className="size-[1.6cqw] text-[var(--gold-400)]" />
            <Feather className="size-[1.6cqw] text-[var(--gold-300)]" />
            <Compass className="size-[1.6cqw] text-[var(--gold-400)]" />
          </OrbitingCircles>
          <div className="glass-card flex size-[5.4cqw] items-center justify-center rounded-[1.4cqw]">
            <Sprout className="size-[2.7cqw] text-[var(--gold-300)]" />
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.18} className="relative z-10">
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
      </BlurFade>

      <BlurFade delay={0.32} className="relative z-10">
        <div className="hairline mx-auto mt-[1.3cqw] h-px w-[34cqw]" />
      </BlurFade>

      <BlurFade delay={0.45} className="relative z-10">
        <div className="glass-card relative mt-[1.5cqw] overflow-hidden rounded-full px-[2.4cqw] py-[0.6cqw]">
          <BorderBeam size={70} duration={5} colorFrom="#f1dc93" colorTo="#a9861d" />
          <div className="flex items-center gap-[1.2cqw] text-[1.25cqw] text-[var(--ivory)]/90">
            <span className="font-bold text-[var(--gold-300)]">{deckMeta.dept}</span>
            <span aria-hidden className="size-[0.45cqw] rotate-45 bg-[var(--gold-400)]" />
            <span>{deckMeta.date}</span>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}

/* ───────────────────────────── فهرست مطالب ───────────────────────────── */
function Toc({ slide }: { slide: Extract<SlideData, { kind: "toc" }> }) {
  return (
    <div className="flex h-full flex-col p-[3cqw]">
      <SlideHeader title="فهرست مطالب" page="آیین‌نامه" part="ماده‌های ۱ تا ۱۳" />
      <div className="grid flex-1 grid-cols-2 gap-x-[1.4cqw] gap-y-[0.85cqw] content-center">
        {slide.items.map((it, i) => (
          <BlurFade
            key={it.n}
            delay={0.1 + i * 0.05}
            className="glass-card-soft flex items-center gap-[0.85cqw] rounded-[0.8cqw] px-[1cqw] py-[0.62cqw]"
          >
            <Medallion n={it.n} className="size-[1.9cqw] text-[0.95cqw]" />
            <span className="flex-1 text-[1.18cqw] font-semibold leading-[1.55] text-[var(--ivory)]/92">
              {it.t}
            </span>
            {it.chapter ? (
              <span className="rounded-full border border-[rgba(212,175,55,0.35)] px-[0.65cqw] py-[0.12cqw] text-[0.8cqw] text-[var(--gold-300)]">
                {it.chapter}
              </span>
            ) : null}
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────── سرصفحه فصل ───────────────────────────── */
function SectionSlide({ slide }: { slide: Extract<SlideData, { kind: "section" }> }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden text-center">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[4cqw] left-0 select-none text-[17cqw] font-black leading-none text-transparent"
        style={{ WebkitTextStroke: "1.5px rgba(212,175,55,0.14)" }}
      >
        {slide.kicker}
      </span>
      <BlurFade>
        <span className="glass-card rounded-full px-[1.6cqw] py-[0.5cqw]">
          <AnimatedShinyText className="text-[1.3cqw] font-bold text-[var(--gold-200)]">
            {slide.kicker}
          </AnimatedShinyText>
        </span>
      </BlurFade>
      <BlurFade delay={0.12}>
        <h2 className="mt-[1.2cqw] text-[4cqw] font-black leading-[1.4]">
          <AnimatedGradientText speed={1.4} colorFrom="#f1dc93" colorTo="#b8860b">
            {slide.title}
          </AnimatedGradientText>
        </h2>
      </BlurFade>
      {slide.sub ? (
        <BlurFade delay={0.24}>
          <p className="mt-[1cqw] max-w-[70cqw] text-[1.5cqw] leading-[1.9] text-[var(--ink-muted)]">
            {slide.sub}
          </p>
        </BlurFade>
      ) : null}
      <BlurFade delay={0.34}>
        <div className="hairline mx-auto mt-[1.6cqw] h-px w-[26cqw]" />
      </BlurFade>
    </div>
  );
}

/* ───────────────────────────── کارت‌های تعریف ───────────────────────────── */
function Defs({ slide }: { slide: Extract<SlideData, { kind: "defs" }> }) {
  return (
    <div className="flex h-full flex-col p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      <div className="grid flex-1 grid-cols-2 gap-[1.2cqw] content-center">
        {slide.defs.map((d, i) => (
          <BlurFade
            key={d.n}
            delay={0.12 + i * 0.09}
            className="glass-card relative flex items-start gap-[1cqw] rounded-[1.1cqw] p-[1.6cqw]"
          >
            <Medallion n={d.n} />
            <div>
              <p className="text-[1.5cqw] font-extrabold leading-[1.6] text-[var(--gold-200)]">{d.term}</p>
              <RichText
                text={d.body}
                className="mt-[0.4cqw] block text-[1.32cqw] leading-[2] text-[var(--ivory)]/88"
              />
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────── هسته/واحد فناور + اعداد کلیدی ───────────────────── */
function DefHero({ slide }: { slide: Extract<SlideData, { kind: "defhero" }> }) {
  return (
    <div className="flex h-full flex-col gap-[1.1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part="بخش ۲ از ۳" />
      <div className="grid flex-1 grid-cols-2 gap-[1.2cqw] content-center">
        {slide.defs.map((d, i) => (
          <BlurFade
            key={d.n}
            delay={0.1 + i * 0.1}
            className="glass-card relative flex items-start gap-[1cqw] rounded-[1.1cqw] p-[1.5cqw]"
          >
            <Medallion n={d.n} />
            <div>
              <p className="text-[1.42cqw] font-extrabold leading-[1.6] text-[var(--gold-200)]">{d.term}</p>
              <RichText
                text={d.body}
                className="mt-[0.35cqw] block text-[1.24cqw] leading-[1.95] text-[var(--ivory)]/88"
              />
            </div>
          </BlurFade>
        ))}
      </div>
      <BlurFade delay={0.3} className="grid grid-cols-5 gap-[0.9cqw]">
        {slide.stats?.map((s) => <StatChip key={s.l} v={s.v} l={s.l} />)}
      </BlurFade>
      {slide.note ? <NoteStrip note={slide.note} delay={0.4} /> : null}
    </div>
  );
}

/* ───────────────────────────── مأموریت و اهداف ───────────────────────────── */
function Mission({ slide }: { slide: Extract<SlideData, { kind: "mission" }> }) {
  return (
    <div className="flex h-full flex-col gap-[1.2cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      <BlurFade
        delay={0.1}
        className="glass-card relative overflow-hidden rounded-[1.1cqw] p-[1.5cqw] text-center"
      >
        <BorderBeam size={90} duration={7} colorFrom="#f1dc93" colorTo="#a9861d" />
        <RichText
          text={slide.intro}
          className="text-[1.6cqw] font-bold leading-[1.95] text-[var(--ivory)]"
        />
      </BlurFade>
      <div className="grid flex-1 grid-cols-2 gap-[1.2cqw] content-center">
        {slide.goals.map((g, i) => (
          <BlurFade
            key={g.t}
            delay={0.2 + i * 0.09}
            className="glass-card-soft flex items-start gap-[0.9cqw] rounded-[1cqw] p-[1.25cqw]"
          >
            <Medallion n={`${["۱", "۲", "۳", "۴"][i]}`} />
            <div>
              <p className="text-[1.35cqw] font-extrabold leading-[1.6] text-[var(--gold-200)]">{g.t}</p>
              <RichText
                text={g.b}
                className="mt-[0.3cqw] block text-[1.22cqw] leading-[1.95] text-[var(--ivory)]/85"
              />
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────── قلمروهای شش‌گانه ───────────────────────────── */
function Bento6({ slide }: { slide: Extract<SlideData, { kind: "bento6" }> }) {
  return (
    <div className="flex h-full flex-col gap-[1.2cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      <BlurFade delay={0.1}>
        <p className="text-[1.45cqw] font-semibold leading-[1.8] text-[var(--ink-muted)]">{slide.intro}</p>
      </BlurFade>
      <div className="grid flex-1 grid-cols-3 gap-[1.2cqw] content-center">
        {slide.items.map((it, i) => (
          <BlurFade key={it} delay={0.16 + i * 0.07}>
            <MagicCard
              className="h-full rounded-[1.1cqw]"
              gradientFrom="rgba(212,175,55,0.9)"
              gradientTo="rgba(169,134,29,0.9)"
              gradientColor="rgba(212,175,55,0.07)"
              gradientOpacity={1}
              gradientSize={260}
            >
              <div className="flex h-full flex-col items-center justify-center gap-[0.5cqw] p-[1.5cqw] text-center">
                <span className="gold-gradient-text text-[2.5cqw] font-black leading-none">
                  {["۱", "۲", "۳", "۴", "۵", "۶"][i]}
                </span>
                <span className="text-[1.42cqw] font-extrabold leading-[1.6] text-[var(--ivory)]">{it}</span>
              </div>
            </MagicCard>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────── پنل‌های ارکان ───────────────────────────── */
function Panels({ slide }: { slide: Extract<SlideData, { kind: "panels" }> }) {
  return (
    <div className="flex h-full flex-col gap-[1.1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      {slide.intro ? (
        <BlurFade delay={0.1}>
          <p className="text-[1.45cqw] font-semibold leading-[1.8] text-[var(--ink-muted)]">{slide.intro}</p>
        </BlurFade>
      ) : null}
      <div className="flex flex-1 flex-col justify-center gap-[1.1cqw]">
        {slide.panels.map((p, i) => (
          <BlurFade
            key={p.t}
            delay={0.16 + i * 0.1}
            className="glass-card flex items-start gap-[1cqw] rounded-[1.1cqw] p-[1.4cqw]"
          >
            {p.n ? <Medallion n={p.n} /> : null}
            <div>
              <p className="text-[1.45cqw] font-extrabold leading-[1.6] text-[var(--gold-200)]">{p.t}</p>
              <RichText
                text={p.b}
                className="mt-[0.3cqw] block text-[1.3cqw] leading-[1.95] text-[var(--ivory)]/88"
              />
            </div>
          </BlurFade>
        ))}
        {slide.notes ? (
          <div className="flex flex-col gap-[0.7cqw]">
            {slide.notes.map((nt, i) => (
              <NoteStrip key={nt.l} note={nt} delay={0.32 + i * 0.08} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ───────────────────────────── لیست شماره‌دار ───────────────────────────── */
function Numbered({ slide }: { slide: Extract<SlideData, { kind: "numbered" }> }) {
  return (
    <div className="flex h-full flex-col p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      {slide.sub ? (
        <BlurFade delay={0.1}>
          <p className="mb-[0.9cqw] text-[1.4cqw] font-semibold text-[var(--ink-muted)]">{slide.sub}</p>
        </BlurFade>
      ) : null}
      <div className="flex flex-1 flex-col justify-center gap-[0.85cqw]">
        {slide.items.map((it, i) => (
          <BlurFade
            key={i}
            delay={0.12 + i * 0.08}
            className="glass-card-soft flex items-center gap-[1cqw] rounded-[0.9cqw] px-[1.2cqw] py-[0.8cqw]"
          >
            <Medallion n={`${["۱", "۲", "۳", "۴", "۵"][i]}`} className="size-[2cqw] text-[1cqw]" />
            <RichText
              text={it.t}
              className="text-[1.3cqw] leading-[1.85] text-[var(--ivory)]/90"
            />
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────── چک‌لیست وظایف شورا ───────────────────────────── */
function Checklist({ slide }: { slide: Extract<SlideData, { kind: "checklist" }> }) {
  return (
    <div className="flex h-full flex-col p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      <div className="flex flex-1 flex-col justify-center gap-[0.85cqw]">
        {slide.items.map((it, i) => (
          <BlurFade
            key={i}
            delay={0.1 + i * 0.08}
            className="glass-card-soft flex items-start gap-[0.9cqw] rounded-[0.9cqw] px-[1.2cqw] py-[0.85cqw]"
          >
            <span className="mt-[0.15cqw] flex size-[1.9cqw] shrink-0 items-center justify-center rounded-full bg-[rgba(212,175,55,0.18)]">
              <Check className="size-[1.1cqw] text-[var(--gold-300)]" strokeWidth={3} />
            </span>
            <RichText
              text={it}
              className="text-[1.32cqw] font-medium leading-[1.85] text-[var(--ivory)]/90"
            />
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── سازوکار جلسات + چیپ‌ها ───────────────────────── */
function Rules({ slide }: { slide: Extract<SlideData, { kind: "rules" }> }) {
  return (
    <div className="flex h-full flex-col gap-[1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      <div className="flex flex-1 flex-col justify-center gap-[0.7cqw]">
        {slide.items.map((it, i) => (
          <BlurFade
            key={i}
            delay={0.1 + i * 0.08}
            className="glass-card-soft flex items-start gap-[0.9cqw] rounded-[0.9cqw] px-[1.15cqw] py-[0.72cqw]"
          >
            <Medallion n={`${["۱", "۲", "۳", "۴"][i]}`} className="size-[1.85cqw] text-[0.95cqw]" />
            <RichText
              text={it}
              className="text-[1.24cqw] leading-[1.85] text-[var(--ivory)]/90"
            />
          </BlurFade>
        ))}
      </div>
      <BlurFade delay={0.42} className="grid grid-cols-4 gap-[1cqw]">
        {slide.chips.map((c) => (
          <StatChip key={c.l} v={c.v} l={c.l} />
        ))}
      </BlurFade>
    </div>
  );
}

/* ───────────────────────── گردش‌کار (مراحل) ───────────────────────── */
function Flow({ slide }: { slide: Extract<SlideData, { kind: "flow" }> }) {
  const four = slide.steps.length >= 4;
  return (
    <div className="flex h-full flex-col gap-[0.9cqw] p-[2.8cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      {slide.intro ? (
        <BlurFade delay={0.1}>
          <p className="glass-card-soft rounded-[0.8cqw] px-[1.1cqw] py-[0.55cqw] text-[1.12cqw] leading-[1.8] text-[var(--ink-muted)]">
            {slide.intro}
          </p>
        </BlurFade>
      ) : null}
      <div className="flex flex-1 items-stretch gap-[0.55cqw]">
        {slide.steps.map((st, i) => (
          <div key={st.t} className="flex min-w-0 flex-1 items-stretch gap-[0.55cqw]">
            <BlurFade
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
            </BlurFade>
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

/* ───────────────────────── تصمیم شورا ───────────────────────── */
function Statuses({ slide }: { slide: Extract<SlideData, { kind: "statuses" }> }) {
  return (
    <div className="flex h-full flex-col gap-[1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      <BlurFade delay={0.1} className="glass-card rounded-[1cqw] p-[1.3cqw]">
        <p className="text-[1.4cqw] font-extrabold text-[var(--gold-200)]">۱. وظایف شورای مرکز رشد:</p>
        <Bullet text={slide.listen} delay={0.18} className="mt-[0.6cqw]" />
        <p className="mt-[0.7cqw] text-[1.3cqw] font-bold leading-[1.8] text-[var(--ivory)]/90">
          {slide.intro}
        </p>
      </BlurFade>
      <div className="grid flex-1 grid-cols-2 gap-[0.9cqw] content-center">
        {slide.statuses.map((s, i) => (
          <BlurFade
            key={s}
            delay={0.22 + i * 0.08}
            className="glass-card-soft flex items-start gap-[0.75cqw] rounded-[0.9cqw] px-[1.15cqw] py-[0.8cqw]"
          >
            <span aria-hidden className="mt-[0.68cqw] block size-[0.5cqw] shrink-0 rotate-45 bg-[var(--gold-400)]" />
            <RichText text={s} className="text-[1.3cqw] font-semibold leading-[1.85] text-[var(--ivory)]/92" />
          </BlurFade>
        ))}
      </div>
      <NoteStrip note={slide.clerk} delay={0.5} />
    </div>
  );
}

/* ───────────────────────── قرارداد سه‌جانبه ───────────────────────── */
function Triple({ slide }: { slide: Extract<SlideData, { kind: "triple" }> }) {
  return (
    <div className="flex h-full flex-col gap-[1.1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      <BlurFade delay={0.1} className="text-center">
        <span className="inline-block rounded-full border border-[rgba(212,175,55,0.45)] bg-[rgba(212,175,55,0.1)] px-[1.5cqw] py-[0.4cqw] text-[1.2cqw] font-bold text-[var(--gold-300)]">
          قرارداد استقرار (سه‌جانبه)
        </span>
      </BlurFade>
      <div className="grid flex-1 grid-cols-3 gap-[1.2cqw] content-center">
        {slide.cols.map((c, i) => (
          <BlurFade
            key={c.t}
            delay={0.18 + i * 0.1}
            className="glass-card flex flex-col rounded-[1.1cqw] p-[1.3cqw]"
          >
            <p className="border-b border-[rgba(212,175,55,0.25)] pb-[0.6cqw] text-[1.22cqw] font-extrabold leading-[1.65] text-[var(--gold-200)]">
              {c.t}
            </p>
            <div className="mt-[0.7cqw] flex flex-col gap-[0.7cqw]">
              {c.bullets.map((b, j) => (
                <Bullet key={j} text={b} delay={0.28 + i * 0.1 + j * 0.06} dense />
              ))}
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── پایش و تعیین تکلیف ───────────────────────── */
function Outcomes({ slide }: { slide: Extract<SlideData, { kind: "outcomes" }> }) {
  return (
    <div className="flex h-full flex-col gap-[1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      <div className="grid grid-cols-2 gap-[1.2cqw]">
        {slide.blocks.map((b, i) => (
          <BlurFade
            key={b.t}
            delay={0.12 + i * 0.1}
            className="glass-card rounded-[1cqw] p-[1.25cqw]"
          >
            <p className="border-b border-[rgba(212,175,55,0.25)] pb-[0.55cqw] text-[1.18cqw] font-extrabold leading-[1.65] text-[var(--gold-200)]">
              {b.t}
            </p>
            <div className="mt-[0.65cqw] flex flex-col gap-[0.6cqw]">
              {b.bullets.map((x, j) => (
                <Bullet key={j} text={x} delay={0.2 + i * 0.1 + j * 0.06} dense />
              ))}
            </div>
          </BlurFade>
        ))}
      </div>
      <BlurFade delay={0.34} className="glass-card flex flex-1 flex-col justify-center gap-[0.8cqw] rounded-[1cqw] p-[1.2cqw]">
        <p className="text-[1.25cqw] font-extrabold leading-[1.7] text-[var(--gold-200)]">
          {slide.outcomesIntro}
        </p>
        <div className="grid grid-cols-2 gap-x-[1.4cqw] gap-y-[0.55cqw]">
          {slide.outcomes.map((o, i) => (
            <Bullet key={i} text={o} delay={0.42 + i * 0.06} dense />
          ))}
        </div>
      </BlurFade>
    </div>
  );
}

/* ───────────────────────── سبد خدمات حمایتی ───────────────────────── */
function Services({ slide }: { slide: Extract<SlideData, { kind: "services" }> }) {
  return (
    <div className="flex h-full flex-col gap-[1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      {slide.intro ? (
        <BlurFade delay={0.1}>
          <p className="glass-card-soft rounded-[0.8cqw] px-[1.1cqw] py-[0.55cqw] text-[1.15cqw] leading-[1.85] text-[var(--ivory)]/85">
            <RichText text={slide.intro} />
          </p>
        </BlurFade>
      ) : null}
      <div className="flex flex-1 flex-col justify-center gap-[0.8cqw]">
        {slide.items.map((it, i) => (
          <BlurFade key={it.n} delay={0.16 + i * 0.09}>
            <MagicCard
              className="rounded-[1cqw]"
              gradientFrom="rgba(212,175,55,0.9)"
              gradientTo="rgba(169,134,29,0.9)"
              gradientColor="rgba(212,175,55,0.06)"
              gradientOpacity={1}
              gradientSize={280}
            >
              <div className="flex items-start gap-[0.95cqw] p-[1.05cqw]">
                <Medallion n={it.n} className="size-[2cqw] text-[1cqw]" />
                <div>
                  <p className="text-[1.3cqw] font-extrabold leading-[1.6] text-[var(--gold-200)]">{it.t}</p>
                  <RichText
                    text={it.b}
                    className="mt-[0.25cqw] block text-[1.18cqw] leading-[1.9] text-[var(--ivory)]/88"
                  />
                </div>
              </div>
            </MagicCard>
          </BlurFade>
        ))}
        {slide.notes ? (
          <div className="flex flex-col gap-[0.6cqw]">
            {slide.notes.map((nt, i) => (
              <NoteStrip key={nt.l} note={nt} delay={0.4 + i * 0.08} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ───────────────────────── خطوط قرمز ───────────────────────── */
function Redlines({ slide }: { slide: Extract<SlideData, { kind: "redlines" }> }) {
  return (
    <div className="flex h-full flex-col gap-[1cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} part={slide.part} />
      {slide.intro ? (
        <BlurFade delay={0.1}>
          <p className="text-[1.35cqw] font-semibold leading-[1.8] text-[var(--ink-muted)]">{slide.intro}</p>
        </BlurFade>
      ) : null}
      <div className="flex flex-1 flex-col justify-center gap-[0.85cqw]">
        {slide.items.map((it, i) => (
          <BlurFade
            key={it.n}
            delay={0.16 + i * 0.1}
            className="glass-card-soft flex items-start gap-[0.95cqw] rounded-[1cqw] border-r-2 border-r-[#e05252] p-[1.2cqw]"
          >
            <span className="mt-[0.1cqw] flex size-[2cqw] shrink-0 items-center justify-center rounded-full bg-[rgba(224,82,82,0.14)]">
              <ShieldAlert className="size-[1.15cqw] text-[#ff9090]" />
            </span>
            <div>
              <p className="text-[1.32cqw] font-extrabold leading-[1.6] text-[var(--gold-200)]">
                {it.n}. {it.t}
              </p>
              <RichText
                text={it.b}
                className="mt-[0.3cqw] block text-[1.22cqw] leading-[1.95] text-[var(--ivory)]/88"
              />
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── منابع مالی ───────────────────────── */
function Finance({ slide }: { slide: Extract<SlideData, { kind: "finance" }> }) {
  return (
    <div className="flex h-full flex-col gap-[0.9cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      <BlurFade delay={0.1} className="glass-card rounded-[1cqw] p-[1.15cqw]">
        <RichText text={slide.p1} className="text-[1.28cqw] leading-[1.95] text-[var(--ivory)]/90" />
      </BlurFade>
      <BlurFade delay={0.2} className="glass-card-soft flex flex-1 flex-col justify-center gap-[0.7cqw] rounded-[1cqw] p-[1.15cqw]">
        <p className="text-[1.3cqw] font-extrabold text-[var(--gold-200)]">{slide.sourcesIntro}</p>
        <div className="grid grid-cols-2 gap-x-[1.4cqw] gap-y-[0.55cqw]">
          {slide.sources.map((s, i) => (
            <Bullet key={i} text={s} delay={0.28 + i * 0.06} dense />
          ))}
        </div>
      </BlurFade>
      <BlurFade delay={0.4} className="glass-card rounded-[1cqw] border-r-2 border-r-[var(--gold-400)] p-[1.05cqw]">
        <RichText text={slide.p3} className="text-[1.22cqw] leading-[1.9] text-[var(--ivory)]/90" />
      </BlurFade>
    </div>
  );
}

/* ───────────────────────── بلوک‌های حقوقی ───────────────────────── */
function Legal({ slide }: { slide: Extract<SlideData, { kind: "legal" }> }) {
  return (
    <div className="flex h-full flex-col gap-[0.9cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      <div className="flex flex-1 flex-col justify-center gap-[0.9cqw]">
        {slide.blocks.map((b, i) => (
          <BlurFade
            key={b.t}
            delay={0.12 + i * 0.1}
            className="glass-card rounded-[1cqw] p-[1.2cqw]"
          >
            <p className="text-[1.3cqw] font-extrabold leading-[1.6] text-[var(--gold-200)]">{b.t}</p>
            <RichText
              text={b.b}
              className="mt-[0.4cqw] block text-[1.2cqw] leading-[1.95] text-[var(--ivory)]/88"
            />
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── ۹ شیوه‌نامه ───────────────────────── */
function Protocols({ slide }: { slide: Extract<SlideData, { kind: "protocols" }> }) {
  return (
    <div className="flex h-full flex-col gap-[0.9cqw] p-[2.8cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      <BlurFade delay={0.08}>
        <span className="glass-card inline-block rounded-full px-[1.4cqw] py-[0.4cqw]">
          <AnimatedShinyText className="text-[1.1cqw] font-bold text-[var(--gold-200)]">
            {slide.kicker}
          </AnimatedShinyText>
        </span>
      </BlurFade>
      <BlurFade delay={0.14}>
        <p className="glass-card-soft rounded-[0.8cqw] px-[1.1cqw] py-[0.55cqw] text-[1.15cqw] leading-[1.85] text-[var(--ivory)]/88">
          <RichText text={slide.intro} />
        </p>
      </BlurFade>
      <div className="grid flex-1 grid-cols-3 gap-[0.8cqw] content-center">
        {slide.items.map((it, i) => (
          <BlurFade
            key={i}
            delay={0.2 + i * 0.05}
            className="glass-card-soft flex items-start gap-[0.6cqw] rounded-[0.85cqw] p-[0.9cqw]"
          >
            <span aria-hidden className="mt-[0.6cqw] block size-[0.42cqw] shrink-0 rotate-45 bg-[var(--gold-400)]" />
            <RichText text={it} className="text-[1.02cqw] leading-[1.8] text-[var(--ivory)]/90" />
          </BlurFade>
        ))}
      </div>
      <BlurFade delay={0.5} className="flex justify-center">
        <div className="relative rounded-full px-[1.8cqw] py-[0.6cqw]">
          <ShineBorder borderWidth={1.2} duration={6} shineColor={["#f1dc93", "#c9a227"]} className="rounded-full" />
          <div className="relative flex items-center gap-[0.7cqw] text-[1.2cqw] font-bold text-[var(--gold-300)]">
            <Timer className="size-[1.25cqw]" />
            {slide.deadline}
          </div>
        </div>
      </BlurFade>
    </div>
  );
}

/* ───────────────────────── پایان ───────────────────────── */
function Closing() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden text-center">
      <Ripple mainCircleSize={300} mainCircleOpacity={0.2} numCircles={7} />
      <Meteors number={8} />
      <BlurFade className="relative z-10">
        <span className="glass-card inline-block rounded-full px-[1.5cqw] py-[0.45cqw]">
          <AnimatedShinyText className="text-[1.15cqw] font-bold text-[var(--gold-200)]">
            آیین‌نامه مرکز رشد واحدهای فناور علوم انسانی اسلامی
          </AnimatedShinyText>
        </span>
      </BlurFade>
      <BlurFade delay={0.14} className="relative z-10">
        <h2 className="mt-[1.3cqw] text-[4.2cqw] font-black leading-[1.4]">
          <AnimatedGradientText speed={1.2} colorFrom="#f1dc93" colorTo="#b8860b">
            با سپاس از توجه شما
          </AnimatedGradientText>
        </h2>
      </BlurFade>
      <BlurFade delay={0.26} className="relative z-10">
        <p className="mt-[0.9cqw] text-[1.5cqw] font-bold text-[var(--ivory)]/85">
          {deckMeta.dept} — {deckMeta.org}
        </p>
        <p className="mt-[0.35cqw] text-[1.1cqw] text-[var(--ink-muted)]">{deckMeta.date}</p>
      </BlurFade>
      <BlurFade
        delay={0.4}
        className="absolute bottom-[2.6cqw] left-0 right-0 z-10 [mask-image:linear-gradient(90deg,transparent,white_12%,white_88%,transparent)]"
      >
        <Marquee pauseOnHover className="[--duration:30s] [--gap:1.6cqw]">
          {[...slides.filter((s) => s.kind === "toc").flatMap((s) => (s.kind === "toc" ? s.items : [])),
            ...slides.filter((s) => s.kind === "toc").flatMap((s) => (s.kind === "toc" ? s.items : []))].map(
            (it, i) => (
              <span key={i} className="flex items-center gap-[1.6cqw] text-[1.05cqw] text-[var(--ink-muted)]">
                <span className="whitespace-nowrap">
                  ماده {it.n}: {it.t}
                </span>
                <span aria-hidden className="size-[0.4cqw] rotate-45 bg-[var(--gold-500)]/70" />
              </span>
            )
          )}
        </Marquee>
      </BlurFade>
    </div>
  );
}

/* ───────────────────────── رندر اصلی ───────────────────────── */
export function SlideView({ slide }: { slide: SlideData }) {
  let content: ReactNode = null;
  switch (slide.kind) {
    case "cover":
      content = <Cover />;
      break;
    case "toc":
      content = <Toc slide={slide} />;
      break;
    case "section":
      content = <SectionSlide slide={slide} />;
      break;
    case "defs":
      content = <Defs slide={slide} />;
      break;
    case "defhero":
      content = <DefHero slide={slide} />;
      break;
    case "mission":
      content = <Mission slide={slide} />;
      break;
    case "bento6":
      content = <Bento6 slide={slide} />;
      break;
    case "panels":
      content = <Panels slide={slide} />;
      break;
    case "numbered":
      content = <Numbered slide={slide} />;
      break;
    case "checklist":
      content = <Checklist slide={slide} />;
      break;
    case "rules":
      content = <Rules slide={slide} />;
      break;
    case "flow":
      content = <Flow slide={slide} />;
      break;
    case "statuses":
      content = <Statuses slide={slide} />;
      break;
    case "triple":
      content = <Triple slide={slide} />;
      break;
    case "outcomes":
      content = <Outcomes slide={slide} />;
      break;
    case "services":
      content = <Services slide={slide} />;
      break;
    case "redlines":
      content = <Redlines slide={slide} />;
      break;
    case "finance":
      content = <Finance slide={slide} />;
      break;
    case "legal":
      content = <Legal slide={slide} />;
      break;
    case "protocols":
      content = <Protocols slide={slide} />;
      break;
    case "closing":
      content = <Closing />;
      break;
  }
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,var(--navy-950)_0%,var(--navy-900)_55%,var(--navy-850)_100%)]">
      {slide.kind === "cover" || slide.kind === "closing" || slide.kind === "section" ? null : (
        <SlideBackdrop />
      )}
      {content}
    </div>
  );
}
