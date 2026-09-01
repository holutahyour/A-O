import { wedding } from "@/data/wedding"
import Bloom from "@/components/motion/Bloom"
import SectionHeading from "@/components/ui/SectionHeading"

function Card({
  title,
  children,
  order,
}: {
  title: string
  children: React.ReactNode
  order: number
}) {
  return (
    <Bloom
      as="article"
      order={order}
      className="rounded-2xl border border-blush-200 bg-ivory p-7"
    >
      <h3 className="font-display text-[22px] font-normal leading-tight text-wine">
        {title}
      </h3>
      <div className="mt-3 text-[14px] leading-relaxed text-ink">{children}</div>
    </Bloom>
  )
}

export default function Details() {
  return (
    <section id="details" className="section bg-blush-50">
      <div className="shell">
        <SectionHeading
          eyebrow="Good to know"
          title="The Details"
          lead="A few small things that will make the day run beautifully for everyone."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          <Card title="Colour of the day" order={0}>
            <p>Wear these if you can, and if not, simply come dressed to celebrate.</p>
            <ul className="mt-4 space-y-2.5">
              {wedding.colours.map((c) => (
                <li key={c.name} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="block h-7 w-12 rounded-md border border-black/5 shadow-inner"
                    style={{ background: c.hex }}
                  />
                  <span className="font-ui text-[13px] font-medium uppercase tracking-[0.14em] text-ink">
                    {c.name}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Adults only" order={1}>
            <p>
              We love your little ones dearly, but this celebration is for adults only. No
              kids, please. Thank you for making arrangements ahead of the day.
            </p>
          </Card>

          <Card title="Gifts" order={2}>
            <p>
              All gifts are monetized, which simply means the couple would love to receive
              cash rather than items. It lets them choose exactly what their new home needs.
            </p>
            <a
              href="#gifts"
              className="mt-3 inline-block py-3 font-ui text-[11px] font-medium uppercase tracking-[0.16em] text-wine underline decoration-gold/50 underline-offset-4 transition-colors hover:decoration-gold"
            >
              Go to the gift table
            </a>
          </Card>

          <Card title="Getting there" order={3}>
            <p>
              Both venues are by College Bus stop in Ifako-Ijaiye, a landmark every local
              driver knows. Parking is available at the reception hall, and the walk between
              the two is short.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
