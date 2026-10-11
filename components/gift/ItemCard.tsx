"use client"

import Image from "next/image"
import type { GiftItem } from "@/data/wedding"
import { useGiftSheet } from "./GiftSheet"
import GiftTile from "./GiftTile"

/**
 * A gift on the table. Deliberately without a price: the couple have asked for
 * cash, and naming a figure turns a blessing into an invoice. The card names
 * the thing, and the guest decides what it is worth to them.
 */
export default function ItemCard({ item }: { item: GiftItem }) {
  const { open } = useGiftSheet()

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-blush-200 bg-ivory transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_18px_40px_-24px_rgba(107,18,34,0.35)]">
      <div className="relative">
        {item.imageUrl ? (
          <div className="relative aspect-4/3 overflow-hidden rounded-t-xl bg-blush-50">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : (
          <GiftTile
            category={item.category}
            seed={item.id.charCodeAt(0) + item.id.length}
          />
        )}

        <span className="absolute left-3 top-3 rounded-full bg-ivory/90 px-2.5 py-1 font-ui text-[9px] font-medium uppercase tracking-[0.14em] text-muted backdrop-blur-sm">
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <h3 className="font-display text-[17px] leading-snug text-wine sm:text-xl">
          {item.name}
        </h3>

        <button
          type="button"
          onClick={() => open({ label: item.name, kind: "item" })}
          className="mt-4 w-full rounded-full border border-gold/50 px-2 py-3 font-ui text-[10px] font-medium uppercase tracking-[0.1em] text-wine transition-colors hover:border-gold hover:bg-champagne/30 sm:mt-6 sm:px-4 sm:py-3.5 sm:text-[11px] sm:tracking-[0.16em]"
        >
          {/* "Monetize this gift" does not fit a half-width phone card. */}
          <span className="sm:hidden">Monetize</span>
          <span className="hidden sm:inline">Monetize this gift</span>
        </button>
      </div>
    </article>
  )
}
