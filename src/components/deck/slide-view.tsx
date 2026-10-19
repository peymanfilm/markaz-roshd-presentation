"use client";

import type { SlideData } from "@/lib/deck/types";
import { layouts } from "./layouts";
import { DeckLogo, SlideBackdrop } from "./parts";

/** اسلایدهایی که پس‌زمینهٔ نقطه‌ای مشترک ندارند و خودشان پس‌زمینه دارند */
const NO_BACKDROP: SlideData["kind"][] = [
  "bismillah",
  "leadership",
  "cover",
  "closing",
  "section",
];

/** اسلایدهایی که سرصفحهٔ استاندارد ندارند و نشان لوگو در گوشهٔ اسلاید می‌نشیند
    (جلد نشان بزرگ و مرکزی خودش را دارد) */
const CORNER_LOGO: SlideData["kind"][] = ["bismillah", "leadership", "closing", "section"];

/** دیسپچر: بر اساس kind اسلاید، چیدمان مناسب را رندر می‌کند */
export function SlideView({ slide }: { slide: SlideData }) {
  const View = layouts[slide.kind];
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,var(--navy-950)_0%,var(--navy-900)_55%,var(--navy-850)_100%)]">
      {NO_BACKDROP.includes(slide.kind) ? null : <SlideBackdrop />}
      <View slide={slide} />
      {CORNER_LOGO.includes(slide.kind) ? (
        <DeckLogo className="absolute top-[3cqw] right-[3cqw] z-30 h-[2.9cqw] w-[1.9cqw]" />
      ) : null}
    </div>
  );
}
