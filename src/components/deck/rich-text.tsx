"use client";

import { Fragment } from "react";

function renderSegments(line: string, keyPrefix: string) {
  const parts = line.split(/(<b>[\s\S]*?<\/b>)/g);
  return parts.map((p, i) => {
    if (p.startsWith("<b>")) {
      return (
        <strong key={`${keyPrefix}-b${i}`} className="font-bold text-[var(--gold-300)]">
          {p.replace(/<\/?b>/g, "")}
        </strong>
      );
    }
    return <Fragment key={`${keyPrefix}-t${i}`}>{p}</Fragment>;
  });
}

/**
 * متن سند را رندر می‌کند؛ عبارت‌های داخل <b>…</b> طلایی و توپر می‌شوند
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
