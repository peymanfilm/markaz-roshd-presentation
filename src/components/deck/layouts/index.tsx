"use client";

import type { ReactElement } from "react";
import type { SlideData, SlideOf } from "@/lib/deck/types";
import { AnimatedListView } from "./alist";
import { Bento6View } from "./bento6";
import { BismillahView } from "./bismillah";
import { ChecklistView } from "./checklist";
import { ClosingView } from "./closing";
import { CoverView } from "./cover";
import { DefHeroView } from "./defhero";
import { DefsView } from "./defs";
import { FinanceView } from "./finance";
import { FlowView } from "./flow";
import { LegalView } from "./legal";
import { LeadershipView } from "./leadership";
import { MissionView } from "./mission";
import { NumberedView } from "./numbered";
import { OutcomesView } from "./outcomes";
import { PanelsView } from "./panels";
import { ProtocolsView } from "./protocols";
import { RedlinesView } from "./redlines";
import { RulesView } from "./rules";
import { SectionView } from "./section";
import { ServicesView } from "./services";
import { StatusesView } from "./statuses";
import { TocView } from "./toc";
import { TripleView } from "./triple";

/** چیدمان یک اسلاید — امضای یکنواخت برای دیسپچر */
export type SlideLayout = (props: { slide: SlideData }) => ReactElement;

/** نوع دقیق دادهٔ یک چیدمان را در همین‌جا باریک می‌کند */
function bind<K extends SlideData["kind"]>(
  View: (props: { slide: SlideOf<K> }) => ReactElement,
): SlideLayout {
  return ({ slide }) => <View slide={slide as SlideOf<K>} />;
}

/** نگاشت kind هر اسلاید به چیدمان رندر آن */
export const layouts: Record<SlideData["kind"], SlideLayout> = {
  bismillah: () => <BismillahView />,
  leadership: bind(LeadershipView),
  cover: () => <CoverView />,
  closing: bind(ClosingView),
  toc: bind(TocView),
  section: bind(SectionView),
  defs: bind(DefsView),
  defhero: bind(DefHeroView),
  mission: bind(MissionView),
  bento6: bind(Bento6View),
  panels: bind(PanelsView),
  numbered: bind(NumberedView),
  alist: bind(AnimatedListView),
  checklist: bind(ChecklistView),
  rules: bind(RulesView),
  flow: bind(FlowView),
  statuses: bind(StatusesView),
  triple: bind(TripleView),
  outcomes: bind(OutcomesView),
  services: bind(ServicesView),
  redlines: bind(RedlinesView),
  finance: bind(FinanceView),
  legal: bind(LegalView),
  protocols: bind(ProtocolsView),
};
