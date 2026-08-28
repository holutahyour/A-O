"use client"

import Image from "next/image"
import type { GiftItem } from "@/data/wedding"
import { naira } from "@/lib/format"
import { useGiftSheet } from "./GiftSheet"
import GiftTile from "./GiftTile"

export default function ItemCard({ item }: { item: GiftItem }) {
  const { open } = useGiftSheet()

  const contributed = item.contributedNaira
  const showProgress = typeof contributed === "number"
  const pct = showProgress
    ? Math.min(100, Math.round((contributed / item.targetNaira) * 100))
    : 0
  const funded = showProgress && contributed >= item.targetNaira

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border border-blush-200 bg-ivory transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_18px_40px_-24px_rgba(107,18,34,0.35)] ${
        funded ? "opacity-70" : ""
      }`}
    >
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

        {funded && (
          <span className="absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 font-ui text-[9px] font-medium uppercase tracking-[0.14em] text-ivory">
            Fully blessed
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl leading-snug text-wine">{item.name}</h3>
        <p className="tabular mt-1 font-ui text-[15px] text-ink">{naira(item.targetNaira)}</p>

        {showProgress && (
          <div className="mt-3">
            <div
              className="h-1 w-full overflow-hidden rounded-full bg-blush-200"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${item.name} funding progress`}
            >
              <div
                className="h-full rounded-full bg-gold transition-[width] duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="tabular mt-2 text-[12px] text-muted">
              {naira(contributed)} of {naira(item.targetNaira)} received
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => open({ label: item.name, kind: "item" })}
          className="mt-4 w-full rounded-full border border-gold/50 px-4 py-3.5 font-ui text-[11px] font-medium uppercase tracking-[0.16em] text-wine transition-colors hover:border-gold hover:bg-champagne/30"
        >
          {funded ? "Give anyway" : "Monetize this gift"}
        </button>
      </div>
    </article>
  )
}
