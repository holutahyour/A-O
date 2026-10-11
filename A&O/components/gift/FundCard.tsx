"use client"

import type { Fund } from "@/data/wedding"
import { useGiftSheet } from "./GiftSheet"

/**
 * Deliberately unlike the item cards (wider, no photo, an ornament instead)
 * so the two ideas never blur into one grid of the same thing.
 */
export default function FundCard({ fund }: { fund: Fund }) {
  const { open } = useGiftSheet()

  return (
    <article className="group flex flex-col justify-between rounded-xl border border-champagne-deep/40 bg-champagne/25 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:bg-champagne/40">
      <div>
        <svg
          aria-hidden="true"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          className="text-gold"
        >
          <path
            d="M12 20.5S3.5 15.2 3.5 9.4A4.9 4.9 0 0 1 12 6.2a4.9 4.9 0 0 1 8.5 3.2c0 5.8-8.5 11.1-8.5 11.1Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>

        <h3 className="mt-4 font-display text-2xl leading-tight text-wine">{fund.name}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-ink">{fund.blurb}</p>
      </div>

      <button
        type="button"
        onClick={() => open({ label: fund.name, kind: "fund" })}
        className="mt-6 w-full rounded-full bg-wine px-4 py-3.5 font-ui text-[11px] font-medium uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-wine-deep"
      >
        Support this fund
      </button>
    </article>
  )
}
