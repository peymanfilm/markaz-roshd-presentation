"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import type { SlideOf } from "@/lib/deck/types";
import { RichText } from "../rich-text";
import { DefCard, Fade, SlideHeader } from "../parts";

/** چیدمان: مأموریت و اهداف */
export function MissionView({ slide }: { slide: SlideOf<"mission"> }) {
  return (
    <div className="flex h-full flex-col gap-[1.2cqw] p-[3cqw]">
      <SlideHeader title={slide.title} page={slide.page} />
      <Fade
        delay={0.1}
        className="glass-card relative overflow-hidden rounded-[1.1cqw] p-[1.5cqw] text-center"
      >
        <BorderBeam size={90} duration={7} colorFrom="#f1dc93" colorTo="#a9861d" />
        <RichText
          text={slide.intro}
          className="text-[1.6cqw] font-bold leading-[1.95] text-[var(--ivory)]"
        />
      </Fade>
      <div className="grid flex-1 grid-cols-2 gap-[1.2cqw] content-center">
        {slide.goals.map((g, i) => (
          <DefCard
            key={g.t}
            n={["۱", "۲", "۳", "۴"][i]}
            term={g.t}
            body={g.b}
            delay={0.2 + i * 0.09}
            soft
          />
        ))}
      </div>
    </div>
  );
}
