import { wedding } from "@/data/wedding"
import Bloom from "@/components/motion/Bloom"
import SectionHeading from "@/components/ui/SectionHeading"
import ItemCard from "@/components/gift/ItemCard"
import FundCard from "@/components/gift/FundCard"
import GiftCta from "@/components/gift/GiftCta"

/**
 * The gift hub.
 *
 * The printed card says "MONETIZE ALL GIFTS". Guests will not all know what
 * that means, and the ones who do will be acting on it one-handed, on a phone,
 * possibly at the reception itself. So the section opens by explaining *why*
 * cash — the thing guests quietly wonder about and nobody usually answers —
 * and then gets out of the way in two taps.
 */
export default function Gifts() {
  return (
    <section id="gifts" className="section wash relative">
      <div className="shell">
        <SectionHeading
          eyebrow="Monetize all gifts"
          title="The Gift Table"
          lead="Your presence is the gift. But if you would like to bless their new home, the couple have asked that all gifts be sent as cash — it lets them choose exactly what their home needs."
        />

        <Bloom order={1} className="mt-9 flex justify-center">
          <GiftCta />
        </Bloom>

        {/* Two across on phones: a single-file list of these is an endless scroll,
            and these cards read fine at half width. */}
        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {wedding.giftItems.map((item, i) => (
            <Bloom key={item.id} order={i % 3} className="h-full">
              <ItemCard item={item} />
            </Bloom>
          ))}
        </div>
      </div>

      {/* ── The funds ──────────────────────────────────────────────────── */}
      <div className="shell mt-24">
        <SectionHeading
          eyebrow="Or give towards a milestone"
          title="Love Funds"
          lead="Some gifts are bigger than a single item. These funds help Ayomide and Opeyemi step into home, rest, and movement with joy."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {wedding.funds.map((fund, i) => (
            <Bloom key={fund.id} order={i % 3}>
              <FundCard fund={fund} />
            </Bloom>
          ))}
        </div>
      </div>
    </section>
  )
}
