import React from "react";

export default function FlyRankBadge({
  credentialId = "FR-2026-PO",
  firstName = "Philip",
  fullName = "Philip Omondi",
  track = "Frontend Engineering & AI Systems",
  className = "",
}) {
  const verifyUrl = `https://internship.flyrank.ai/verify?id=${encodeURIComponent(
    credentialId
  )}&first_name=${encodeURIComponent(firstName)}`;

  const glyphPath =
    "M28.2354 74.2202V67.9039C29.6419 68.4369 31.3724 68.7055 33.4311 68.7055C35.3235 68.7055 36.8153 68.2396 37.8979 67.3079C38.9805 66.3762 39.9566 64.8695 40.8218 62.792L42.6887 58.3139L29.8976 29.2879C35.0038 29.2879 39.6028 32.3307 41.5294 36.9893L47.0746 50.3985L56.0126 28.6038C57.9221 23.9452 62.5168 20.894 67.6187 20.894L50.0795 63.5936C48.4556 67.5933 46.5205 70.5102 44.2743 72.3484C42.0281 74.1867 39.1169 75.1058 35.5451 75.1058C32.6212 75.1058 30.1875 74.812 28.2354 74.2244V74.2202Z";

  return (
    <a
      href={verifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Verify ${fullName}'s FlyRank AI Internship credential ${credentialId}`}
      className={`inline-flex items-center gap-3.5 px-4 py-3 rounded-2xl border transition-all duration-200
        bg-white border-[#DDE4E7] text-[#051F21] shadow-sm hover:shadow-md hover:border-emerald-500/50
        dark:bg-[#051F21] dark:border-white/10 dark:text-white dark:hover:border-emerald-400/40
        focus:outline-none focus:ring-2 focus:ring-emerald-500/50 max-w-full text-left ${className}`}
    >
      {/* Official 96x96 Tile (Rendered at 40x40) */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        className="shrink-0"
      >
        <rect
          width="96"
          height="96"
          rx="22"
          className="fill-[#051F21] dark:fill-[#54E399]"
        />
        <path
          d={glyphPath}
          className="fill-[#54E399] dark:fill-[#051F21]"
        />
      </svg>

      {/* Credential Details Column */}
      <div className="flex flex-col gap-0.5 min-w-0 pr-1">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-neutral-500 dark:text-white/55">
          FlyRank AI Internship
        </span>
        <span className="text-[14px] sm:text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap text-[#051F21] dark:text-white">
          Verified Credential
        </span>
        <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-700 dark:text-[#54E399]">
          <span>{credentialId}</span>
          <span className="text-neutral-400 dark:text-neutral-600 font-sans hidden sm:inline">•</span>
          <span className="font-sans text-[11px] text-neutral-500 dark:text-white/50 hidden sm:inline truncate max-w-[170px]">
            {track}
          </span>
        </div>
      </div>

      {/* Verify Pill Action */}
      <span className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold shrink-0 transition-colors
        bg-emerald-50 border border-emerald-200 text-emerald-700
        dark:bg-emerald-500/10 dark:border-emerald-500/25 dark:text-[#54E399]">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M7.9 12.3l2.8 2.8 5.4-5.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Verify
      </span>
    </a>
  );
}
