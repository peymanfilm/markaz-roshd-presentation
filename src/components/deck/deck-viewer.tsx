"use client";

import { ChevronLeft, ChevronRight, Maximize, Minimize, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { deckMeta, slides } from "@/lib/deck";
import { SlideView } from "./slide-view";

const toFa = (n: number | string) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
const TOTAL = slides.length;
const AUTOPLAY_MS = 9000;

export default function DeckViewer() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [isFs, setIsFs] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((delta: number) => {
    setDir(delta >= 0 ? 1 : -1);
    setIndex((i) => Math.min(TOTAL - 1, Math.max(0, i + delta)));
  }, []);

  const jump = useCallback((n: number) => {
    setIndex((i) => {
      setDir(n >= i ? 1 : -1);
      return Math.min(TOTAL - 1, Math.max(0, n));
    });
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen();
  }, []);

  /* بازیابی شماره اسلاید از hash */
  useEffect(() => {
    const h = parseInt(window.location.hash.replace("#", ""), 10);
    if (Number.isNaN(h) || h < 1 || h > TOTAL) return;
    const raf = requestAnimationFrame(() => setIndex(h - 1));
    return () => cancelAnimationFrame(raf);
  }, []);

  /* همگام‌سازی hash */
  useEffect(() => {
    window.history.replaceState(null, "", `#${index + 1}`);
  }, [index]);

  /* پشتیبانی از تغییر hash بیرونی (لینک مستقیم به اسلاید) */
  useEffect(() => {
    const onHash = () => {
      const h = parseInt(window.location.hash.replace("#", ""), 10);
      if (!Number.isNaN(h) && h >= 1 && h <= TOTAL) jump(h - 1);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [jump]);

  /* میانبرهای کیبورد (راست‌به‌چپ: فلش چپ = بعدی) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          go(1);
          break;
        case "ArrowRight":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          go(-1);
          break;
        case "Home":
          e.preventDefault();
          jump(0);
          break;
        case "End":
          e.preventDefault();
          jump(TOTAL - 1);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "p":
        case "P":
          setPlaying((p) => !p);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, jump, toggleFullscreen]);

  /* پخش خودکار */
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      if (index < TOTAL - 1) go(1);
      else setPlaying(false);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, index, go]);

  /* وضعیت تمام‌صفحه */
  useEffect(() => {
    const onFs = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <div className="deck-root dark relative flex h-dvh w-full flex-col overflow-hidden font-sans text-[var(--ivory)]">
      {/* صحنه ارائه */}
      <main
        className="deck-stage-area relative z-10 overflow-hidden px-2.5 py-2 sm:px-6"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
        aria-label="اسلایدهای ارائه"
      >
          <div className="deck-stage">
            {/* تغییر key باعث remount و پخش دوباره انیمیشن CSS ورود اسلاید می‌شود —
                محتوا در SSR نمایان است و به اجرای JS وابسته نیست */}
            <div
              key={index}
              data-slide-frame={index + 1}
              className="deck-slide-frame @container absolute inset-0 overflow-hidden rounded-lg border border-[rgba(212,175,55,0.2)] shadow-[0_34px_90px_-32px_rgba(0,0,0,0.85)]"
              style={{ "--deck-x": dir >= 0 ? "-80px" : "80px" } as React.CSSProperties}
            >
            <SlideView slide={slides[index]} />
          </div>
        </div>
      </main>

      {/* راهنمای چرخش گوشی — فقط در حالت عمودی نمایش داده می‌شود */}
      <p className="deck-rotate-hint relative z-20 px-4 pb-1.5 text-center text-[11px] leading-5 text-[var(--ink-muted)]/80">
        برای نمایش تمام‌صفحه، گوشی را بچرخانید
      </p>

      {/* نوار کنترل */}
      <footer className="relative z-20 mx-auto mb-2.5 flex w-[min(96%,880px)] items-center gap-2.5 rounded-2xl deck-chrome px-3 py-2 sm:gap-3.5 sm:px-4">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            data-action="prev"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="اسلاید قبلی"
            className="flex size-8 items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] text-[var(--gold-300)] transition hover:bg-[rgba(212,175,55,0.15)] disabled:opacity-35"
          >
            <ChevronRight className="size-4.5" />
          </button>
          <button
            type="button"
            data-action="next"
            onClick={() => go(1)}
            disabled={index === TOTAL - 1}
            aria-label="اسلاید بعدی"
            className="flex size-8 items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] text-[var(--gold-300)] transition hover:bg-[rgba(212,175,55,0.15)] disabled:opacity-35"
          >
            <ChevronLeft className="size-4.5" />
          </button>
        </div>

        <span
          data-role="counter"
          className="shrink-0 rounded-full bg-[rgba(212,175,55,0.12)] px-2.5 py-1 text-xs font-bold tabular-nums text-[var(--gold-200)]"
        >
          {toFa(index + 1)} / {toFa(TOTAL)}
        </span>

        {/* نوار پیشرفت */}
        <div
          className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={TOTAL}
          aria-valuenow={index + 1}
        >
          <div
            data-role="progress"
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--gold-600),var(--gold-300))] transition-all duration-500"
            style={{ width: `${((index + 1) / TOTAL) * 100}%` }}
          />
        </div>

        <span className="hidden shrink-0 text-[10.5px] leading-[1.6] text-[var(--ink-muted)]/75 md:block">
          «فلش‌ها» جابه‌جایی <span className="text-[var(--gold-400)]">·</span> «F» تمام‌صفحه{" "}
          <span className="text-[var(--gold-400)]">·</span> «P» پخش خودکار
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            data-action="play"
            onClick={() => setPlaying((p) => !p)}
            aria-label="پخش خودکار"
            className="flex size-8 items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] text-[var(--gold-300)] transition hover:bg-[rgba(212,175,55,0.15)]"
          >
            <span data-role="icon-play" className={playing ? "hidden" : "block"}>
              <Play className="size-4" />
            </span>
            <span data-role="icon-pause" className={playing ? "block" : "hidden"}>
              <Pause className="size-4" />
            </span>
          </button>
          <button
            type="button"
            data-action="fullscreen"
            onClick={toggleFullscreen}
            aria-label="تمام‌صفحه"
            className="flex size-8 items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] text-[var(--gold-300)] transition hover:bg-[rgba(212,175,55,0.15)]"
          >
            {isFs ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
          </button>
        </div>
      </footer>

      {/* نوار پایین — شناسنامهٔ ارائه */}
      <div className="deck-brandbar relative z-20 flex items-center justify-between px-4 pb-2.5 text-[11px] text-[var(--ink-muted)] sm:px-7 sm:text-xs">
        <span className="font-semibold text-[var(--gold-300)]/80">
          {deckMeta.org} <span className="mx-1 text-[var(--gold-500)]">|</span> {deckMeta.dept}
        </span>
        <span className="hidden sm:inline">{deckMeta.title}</span>
      </div>
    </div>
  );
}
