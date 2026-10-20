import type { SlideOf } from "../types";

/** ۳۴ — پایان (برگرفته از 41-payan.html پروژهٔ مرجع) */
const slide: SlideOf<"closing"> = {
  kind: "closing",
  arabic: [
    { t: "و آخر دعوانا", tone: "gold" },
    { t: "أَنِ", tone: "teal" },
    { t: "الْحَمْدُ", tone: "cream" },
    { t: "لِلَّهِ", tone: "lilac" },
    { t: "رَبِّ", tone: "gold" },
    { t: "الْعَالَمِينَ", tone: "teal" },
  ],
  meaning: "آخرین سخن ما این است که ستایش، مخصوص خداوند، پروردگار جهانیان است.",
  leader: "رئیس محترم جامعه المصطفی العالمیه، حضرت آیت الله عباسی (دام توفیقاته)",
  thanks: "و اعضای محترم هیئت رئیسه، از توجه، همراهی و حمایت شما سپاسگزاریم.",
  credit: {
    org: "به همت و تلاش معاونت پژوهش جامعه المصطفی العالمیه",
    term: "پاییز ۱۴۰۵",
  },
};

export default slide;
