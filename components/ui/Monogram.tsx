import { wedding } from "@/data/wedding"

/**
 * The AO monogram. Appears exactly twice on the page (hero and footer), plus
 * small in the sticky header. Anything more and it stops being a mark.
 */
export default function Monogram({
  size = 64,
  tone = "wine",
  className = "",
}: {
  size?: number
  tone?: "wine" | "ivory"
  className?: string
}) {
  const colour = tone === "wine" ? "var(--color-wine)" : "var(--color-ivory)"
  const accent = tone === "wine" ? "var(--color-gold)" : "rgba(255,251,248,0.6)"

  return (
    <span
      className={`inline-flex flex-col items-center leading-none ${className}`}
      aria-label={`${wedding.couple.bride} and ${wedding.couple.groom}`}
    >
      <span
        className="font-display"
        style={{
          color: colour,
          fontSize: size,
          letterSpacing: "0.04em",
          fontWeight: 300,
        }}
      >
        {wedding.couple.monogram}
      </span>
      <svg
        aria-hidden="true"
        width={size * 0.72}
        height={size * 0.16}
        viewBox="0 0 60 10"
        fill="none"
        style={{ marginTop: size * 0.06 }}
      >
        <path
          d="M2 5h19M39 5h19"
          stroke={accent}
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d="M30 0.6c.25 2.9 1.95 4.6 4.4 4.4-2.45.25-4.15 1.95-4.4 4.4-.25-2.45-1.95-4.15-4.4-4.4 2.45-.2 4.15-1.9 4.4-4.4Z"
          fill={accent}
        />
      </svg>
    </span>
  )
}
