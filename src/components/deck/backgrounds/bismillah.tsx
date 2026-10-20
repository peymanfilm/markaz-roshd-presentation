"use client";

/**
 * پس‌زمینه اختصاصی اسلاید ۱ (بسم الله)
 *
 * لایه‌ها از پایین به بالا:
 *   ۱) گرادیان پایه سورمه‌ای      ۵) پرتوهای آسمانی از بالا
 *   ۲) آسمان ستاره‌دار (۲ لایه)     ۶) شمسهٔ چرخان (۲ شبکهٔ متقاطع)
 *   ۳) غبار نورانی (۲ لایه)          ۷) حلقه‌های هم‌مرکز + حلقهٔ مداری
 *   ۴)                               ۸) هاله، پردهٔ متن و وینیت
 *
 * همه‌چیز با CSS خالص انیمیشن می‌شود؛ بدون وابستگی به JS.
 */
export function BismillahBackdrop() {
  return (
    <div className="deck-bg" aria-hidden="true">
      {/* لایه‌های متحرک — با یک کلاس، یک‌جا کم‌رنگ می‌شوند */}
      <div className="deck-bg-anim">
        <div className="deck-bg-stars" />
        <div className="deck-bg-stars-2" />
        <div className="deck-bg-dust" />
        <div className="deck-bg-dust-2" />
        <div className="deck-bg-aurora-1" />
        <div className="deck-bg-aurora-2" />
        <div className="deck-bg-rays" />
        <div className="deck-bg-rosette" />
        <div className="deck-bg-rosette-b" />
        <div className="deck-bg-rings" />
        <div className="deck-bg-orbit" />
        <div className="deck-bg-aura" />
        <div className="deck-bg-halo" />
      </div>
      <div className="deck-bg-scrim" />
      <div className="deck-bg-vignette" />
    </div>
  );
}
