import type { GiftCategory } from "@/data/wedding"

/**
 * The stand-in for a product photo.
 *
 * Rather than stock photographs of appliances, which would look bought-in and
 * date badly, each gift gets a line-drawn tile in the wedding's own palette.
 * When the couple add a real photo to an item, that photo is used instead.
 */

const ICONS: Record<GiftCategory, React.ReactNode> = {
  Kitchen: (
    <>
      <path d="M14 26h36v18a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6V26Z" />
      <path d="M50 30h6a4 4 0 0 1 0 8h-6M14 30H8a4 4 0 0 0 0 8h6" />
      <path d="M24 20c0-3 4-3 4-6M36 20c0-3 4-3 4-6" />
    </>
  ),
  Living: (
    <>
      <path d="M12 34v-6a5 5 0 0 1 5-5h30a5 5 0 0 1 5 5v6" />
      <path d="M8 34h48a4 4 0 0 1 4 4v10H4V38a4 4 0 0 1 4-4Z" />
      <path d="M10 48v5M54 48v5M20 23v11M44 23v11" />
    </>
  ),
  Laundry: (
    <>
      <rect x="12" y="8" width="40" height="48" rx="5" />
      <circle cx="32" cy="36" r="12" />
      <circle cx="32" cy="36" r="5" />
      <path d="M20 17h6M38 17h6" />
    </>
  ),
  Power: (
    <>
      <path d="M35 6 18 36h12l-3 22 19-32H33l2-20Z" />
    </>
  ),
  Bedroom: (
    <>
      <path d="M6 46V22M58 46V32a6 6 0 0 0-6-6H26v12" />
      <path d="M6 34h52M6 46h52M6 52v-6M58 52v-6" />
      <circle cx="16" cy="30" r="5" />
    </>
  ),
}

export default function GiftTile({
  category,
  /** Shifts the wash a little per card so a grid of these does not look stamped. */
  seed = 0,
}: {
  category: GiftCategory
  seed?: number
}) {
  const x = 30 + ((seed * 37) % 41)
  const y = 12 + ((seed * 23) % 29)

  return (
    <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-t-xl bg-blush-50">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 85% 75% at ${x}% ${y}%, rgba(243,215,180,0.7) 0%, rgba(243,215,180,0) 72%)`,
        }}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        className="relative h-16 w-16 text-gold"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.95}
      >
        {ICONS[category]}
      </svg>
    </div>
  )
}
