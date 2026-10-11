"use client"

import { useGiftSheet } from "./GiftSheet"

/**
 * The shortest path to the account number, for guests who already know what
 * they want to do and do not need to browse a grid of appliances first.
 */
export default function GiftCta() {
  const { open } = useGiftSheet()

  return (
    <button
      type="button"
      onClick={() => open()}
      className="rounded-full bg-wine px-9 py-4 font-ui text-[12px] font-medium uppercase tracking-[0.16em] text-ivory shadow-[0_10px_30px_-12px_rgba(142,27,46,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-wine-deep"
    >
      Send a gift now
    </button>
  )
}
