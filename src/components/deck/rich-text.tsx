"use client";

import { Fragment } from "react";

function renderSegments(line: string, keyPrefix: string) {
  const parts = line.split(/(<b>[\s\S]*?<\/b>|<t>[\s\S]*?<\/t>)/g);
  return parts.map((p, i) => {
    if (p.startsWith("<b>")) {
      return (
        <strong key={`${keyPrefix}-b${i}`} className="font-bold text-[var(--gold-300)]">
          {p.replace(/<\/?b>/g, "")}
        </strong>
      );
    }
    if (p.startsWith("<t>")) {
      return (
        <strong key={`${keyPrefix}-h${i}`} className="font-semibold text-[#4DCEBF]">
          {p.replace(/<\/?t>/g, "")}
        </strong>
      );
    }
    return <Fragment key={`${keyPrefix}-t${i}`}>{p}</Fragment>;
  });
}

/**
 * متن سند را رندر می‌کند؛ عبارت‌های داخل <b>…</b> طلایی و توپر می‌شوند،
 * عبارت‌های داخل <t>…</t> فیروزه‌ای و نیمه‌توپر می‌شوند
 * و \n به خط جدید تبدیل می‌شود (متن بدون هیچ تغییری حفظ می‌شود).
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  const lines = text.split("\n");
  return (
    <span className={className}>
      {lines.map((line, li) => (
        <Fragment key={`l-${li}`}>
          {li > 0 && <br />}
          {renderSegments(line, `l${li}`)}
        </Fragment>
      ))}
    </span>
  );
}
