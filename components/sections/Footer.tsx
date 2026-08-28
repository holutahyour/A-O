import { wedding } from "@/data/wedding"
import { longDate } from "@/lib/format"
import Bloom from "@/components/motion/Bloom"
import Ornament from "@/components/motion/Ornament"
import Monogram from "@/components/ui/Monogram"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-wine-deep py-20 text-ivory">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,162,75,0.16) 0%, transparent 70%)",
        }}
      />

      <Bloom className="shell relative text-center">
        <Monogram size={48} tone="ivory" />

        <p className="mt-8 font-display text-[clamp(24px,6vw,38px)] font-light leading-tight text-ivory">
          {wedding.couple.bride}
          <span
            className="ml-2 mr-5 font-script text-[1.3em] text-champagne"
            aria-hidden="true"
          >
            &amp;
          </span>
          <span className="sr-only">and </span>
          {wedding.couple.groom}
        </p>

        <p className="eyebrow mt-3 text-champagne/80">{longDate(wedding.ceremonyAt)}</p>

        <Ornament width={44} tone="ivory" className="mt-7" />

        <p className="eyebrow mt-7 text-champagne">{wedding.couple.hashtag}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {wedding.rsvpPhones.map((p) => (
            <a
              key={p.tel}
              href={`tel:${p.tel}`}
              className="tabular inline-block py-2.5 font-ui text-[14px] text-ivory/80 underline decoration-champagne/40 underline-offset-4 transition-colors hover:text-ivory hover:decoration-champagne"
            >
              {p.display}
            </a>
          ))}
        </div>

        <a
          href="/invitation.jpeg"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex items-center gap-2 rounded-full border border-ivory/25 bg-ivory/10 px-7 py-3.5 font-ui text-[11px] font-medium uppercase tracking-[0.16em] text-ivory backdrop-blur-sm transition-colors hover:bg-ivory/20"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M7 1v9M3.5 6.5L7 10l3.5-3.5M1.5 12.5h11"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          View the invitation
        </a>

        <p className="mt-12 text-[13px] leading-relaxed text-ivory/50">
          Made with love, for a day we have all been waiting for.
        </p>
      </Bloom>
    </footer>
  )
}
