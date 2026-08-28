"use client"

import { motion, useReducedMotion } from "framer-motion"

/**
 * ——— ✦ ———
 *
 * The one ornament that repeats down the whole page. Two gold hairlines that
 * draw themselves outward from a small four-point star. Using a single
 * repeated separator everywhere is most of what makes the page feel like one
 * designed object rather than a stack of unrelated blocks.
 */

type Props = {
  /** Width of each hairline arm. */
  width?: number
  className?: string
  tone?: "gold" | "ivory"
}

export default function Ornament({ width = 56, className = "", tone = "gold" }: Props) {
  const reduced = useReducedMotion()
  const colour = tone === "gold" ? "var(--color-gold)" : "rgba(255,251,248,0.5)"

  const line = {
    initial: reduced ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 },
    whileInView: { scaleX: 1, opacity: 1 },
  }

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 ${className}`}
    >
      <motion.span
        {...line}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ width, originX: 1, height: 1, background: colour, display: "block" }}
      />
      <motion.svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.35 }}
        style={{ flexShrink: 0 }}
      >
        {/* A concave four-point sparkle. The straight-edged diamond this
            replaced read as a plus sign at small sizes. */}
        <path
          d="M12 0C12.6 6.9 17.1 11.4 24 12c-6.9.6-11.4 5.1-12 12-.6-6.9-5.1-11.4-12-12C6.9 11.4 11.4 6.9 12 0Z"
          fill={colour}
        />
      </motion.svg>
      <motion.span
        {...line}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ width, originX: 0, height: 1, background: colour, display: "block" }}
      />
    </div>
  )
}
