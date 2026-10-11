import QRCode from "qrcode"
import { wedding } from "@/data/wedding"
import { longDate } from "@/lib/format"
import Bloom from "@/components/motion/Bloom"
import Ornament from "@/components/motion/Ornament"
import SectionHeading from "@/components/ui/SectionHeading"

/**
 * The QR is generated from the maps URL rather than cropped out of the card
 * image, so it stays sharp at any size and updates automatically if the couple
 * change the pin. It reproduces the printed card's affordance: point a second
 * phone at the screen.
 */
async function mapQr(url: string): Promise<string> {
  return QRCode.toString(url, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#8E1B2E", light: "#00000000" },
  })
}

function PinIcon() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-1 shrink-0 text-gold"
    >
      <path
        d="M8 1.75c-2.4 0-4.35 1.9-4.35 4.25 0 3.2 4.35 8.25 4.35 8.25s4.35-5.05 4.35-8.25c0-2.35-1.95-4.25-4.35-4.25Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="6" r="1.6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-1 shrink-0 text-gold"
    >
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 4.6V8l2.4 1.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export default async function TheDay() {
  const qr = await mapQr(wedding.venues.reception.mapsUrl)
  const venues = [wedding.venues.ceremony, wedding.venues.reception]

  return (
    <section id="the-day" className="section relative">
      <div className="shell">
        <SectionHeading
          eyebrow={longDate(wedding.ceremonyAt)}
          title="The Day"
          lead="Both venues sit within Ifako-Ijaiye, a short distance apart. The reception begins as soon as the ceremony ends."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {venues.map((venue, i) => (
            <Bloom
              as="article"
              key={venue.name}
              order={i}
              className="flex flex-col rounded-2xl border border-blush-200 bg-ivory p-7 transition-colors hover:border-gold/40 sm:p-9"
            >
              <p className="eyebrow">{venue.label}</p>
              <Ornament width={30} className="mt-4 justify-start" />

              <h3 className="mt-5 font-display text-[27px] font-normal leading-tight text-wine">
                {venue.name}
              </h3>

              <div className="mt-5 flex-1 space-y-3">
                <p className="flex gap-2.5 text-[14px] leading-relaxed text-ink">
                  <PinIcon />
                  <span>{venue.address}</span>
                </p>
                <p className="flex gap-2.5 text-[14px] leading-relaxed text-ink">
                  <ClockIcon />
                  <span>{venue.time}</span>
                </p>
              </div>

              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center justify-center rounded-full border border-gold/50 px-6 py-3 font-ui text-[11px] font-medium uppercase tracking-[0.16em] text-wine transition-colors hover:border-gold hover:bg-champagne/30"
              >
                Open in Maps
              </a>
            </Bloom>
          ))}
        </div>

        {/* ── The QR from the printed card ─────────────────────────────── */}
        <Bloom order={2}>
          <div className="mt-10 flex flex-col items-center gap-5 rounded-2xl bg-blush-50 p-8 sm:flex-row sm:justify-center sm:gap-9">
            <div
              className="h-[120px] w-[120px] shrink-0 [&_svg]:h-full [&_svg]:w-full"
              // Generated above from a URL we control.
              dangerouslySetInnerHTML={{ __html: qr }}
              role="img"
              aria-label="QR code linking to the reception venue on Google Maps"
            />
            <div className="text-center sm:text-left">
              <p className="eyebrow">Map to the hall</p>
              <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-ink">
                Point a camera at this code to open the reception venue in Maps, the same
                code printed on your invitation card.
              </p>
            </div>
          </div>
        </Bloom>
      </div>
    </section>
  )
}
