/**
 * انواع دادهٔ اسلایدهای ارائه «آیین‌نامه مرکز رشد واحدهای فناور علوم انسانی اسلامی»
 *
 * ⚠️ تمام متن‌های اسلایدها عیناً از سند رسمی (مهر ۱۴۰۵) برداشت شده‌اند و
 * هیچ جمله‌ای به آن‌ها اضافه یا از آن‌ها کم نشده است. عبارت‌های داخل
 * <b>…</b> صرفاً تأکید بصری همان کلمات سند هستند.
 */

export type Chip = { v: string; l: string };
export type Note = { l: string; b: string };
export type Def = { n: string; term: string; body: string };

export type SlideData =
  | { kind: "bismillah" }
  | {
      kind: "leadership";
      name: string;
      honorific: string;
      lead: string;
      close: string;
      source: string;
    }
  | { kind: "cover" }
  | { kind: "toc"; items: { n: string; t: string; chapter?: string }[] }
  | { kind: "section"; kicker: string; title: string; sub?: string }
  | { kind: "defs"; title: string; page: string; part?: string; defs: Def[] }
  | {
      kind: "defhero";
      title: string;
      page: string;
      defs: Def[];
      note?: Note;
      stats?: Chip[];
    }
  | { kind: "mission"; title: string; page: string; intro: string; goals: { t: string; b: string }[] }
  | { kind: "bento6"; title: string; page: string; intro: string; items: string[] }
  | {
      kind: "panels";
      title: string;
      page: string;
      part?: string;
      intro?: string;
      panels: { n?: string; t: string; b: string }[];
      notes?: Note[];
    }
  | { kind: "numbered"; title: string; page: string; sub?: string; items: { t: string }[] }
  | { kind: "checklist"; title: string; page: string; sub?: string; items: string[] }
  | { kind: "rules"; title: string; page: string; sub?: string; items: string[]; chips: Chip[] }
  | {
      kind: "flow";
      title: string;
      page: string;
      part: string;
      intro?: string;
      steps: { t: string; bullets: string[] }[];
    }
  | {
      kind: "statuses";
      title: string;
      page: string;
      part: string;
      listen: string;
      intro: string;
      statuses: string[];
      clerk: Note;
    }
  | { kind: "triple"; title: string; page: string; part: string; cols: { t: string; bullets: string[] }[] }
  | {
      kind: "outcomes";
      title: string;
      page: string;
      part: string;
      blocks: { t: string; bullets: string[] }[];
      outcomesIntro: string;
      outcomes: string[];
    }
  | {
      kind: "services";
      title: string;
      page: string;
      part: string;
      intro?: string;
      items: { n: string; t: string; b: string }[];
      notes?: Note[];
    }
  | {
      kind: "redlines";
      title: string;
      page: string;
      part: string;
      intro?: string;
      items: { n: string; t: string; b: string }[];
    }
  | {
      kind: "finance";
      title: string;
      page: string;
      p1: string;
      sourcesIntro: string;
      sources: string[];
      p3: string;
    }
  | { kind: "legal"; title: string; page: string; blocks: { t: string; b: string }[] }
  | { kind: "protocols"; title: string; page: string; kicker: string; intro: string; items: string[]; deadline: string }
  | { kind: "closing" };

/** استخراج نوع دقیق یک اسلاید بر اساس kind آن */
export type SlideOf<K extends SlideData["kind"]> = Extract<SlideData, { kind: K }>;
