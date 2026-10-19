"use client";

import { BismillahBackdrop } from "../backgrounds/bismillah";
import { Fade } from "../parts";

/** چیدمان: بسم الله */
export function BismillahView() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden text-center">
      <BismillahBackdrop />
      <Fade delay={0.1} className="relative z-10">
        <p className="deck-title-aurora text-[6.5cqw] font-black leading-none">
          بسم الله الرحمن الرحیم
        </p>
      </Fade>
      <Fade delay={0.5} className="relative z-10 mt-[1.6cqw]">
        <p className="text-[1.5cqw] font-semibold tracking-wide text-[#6FD6CC]/90">
          به نام خداوند بخشنده مهربان
        </p>
      </Fade>
    </div>
  );
}
