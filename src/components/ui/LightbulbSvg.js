export default function LightbulbSvg() {
  return (
    <svg
      width="70"
      height="95"
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-80"
    >
      {/* Bulb body */}
      <ellipse cx="60" cy="55" rx="40" ry="45" fill="#FBBF24" opacity="0.9" />
      <ellipse cx="60" cy="55" rx="32" ry="37" fill="#FCD34D" opacity="0.7" />
      <ellipse cx="55" cy="45" rx="12" ry="15" fill="#FEF3C7" opacity="0.8" />

      {/* Glow effect */}
      <ellipse cx="60" cy="55" rx="48" ry="53" fill="#FBBF24" opacity="0.15" />

      {/* Screw base */}
      <rect x="42" y="95" width="36" height="8" rx="2" fill="#9CA3AF" />
      <rect x="44" y="103" width="32" height="6" rx="2" fill="#6B7280" />
      <rect x="46" y="109" width="28" height="6" rx="2" fill="#9CA3AF" />
      <rect x="48" y="115" width="24" height="6" rx="2" fill="#6B7280" />
      <path d="M50 121 Q60 128 70 121" stroke="#6B7280" strokeWidth="3" fill="none" />

      {/* Filament lines */}
      <path
        d="M52 60 Q55 50 58 60 Q61 50 64 60"
        stroke="#F59E0B"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />

      {/* Rays */}
      <line x1="60" y1="2" x2="60" y2="8" stroke="#FBBF24" strokeWidth="2" opacity="0.5" />
      <line x1="95" y1="20" x2="90" y2="24" stroke="#FBBF24" strokeWidth="2" opacity="0.5" />
      <line x1="105" y1="55" x2="99" y2="55" stroke="#FBBF24" strokeWidth="2" opacity="0.5" />
      <line x1="25" y1="20" x2="30" y2="24" stroke="#FBBF24" strokeWidth="2" opacity="0.5" />
      <line x1="15" y1="55" x2="21" y2="55" stroke="#FBBF24" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}
