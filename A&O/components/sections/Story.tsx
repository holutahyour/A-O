import { wedding } from "@/data/wedding"
import Bloom from "@/components/motion/Bloom"
import SectionHeading from "@/components/ui/SectionHeading"

export default function Story() {
  return (
    <section id="story" className="section wash relative">
      <div className="shell">
        <SectionHeading
          eyebrow="How we got here"
          title="Our Story"
          lead="Every marriage begins long before the day itself. Here is a little of ours."
        />

        <ol className="relative mx-auto mt-16 max-w-3xl">
          {/* The thread running down the timeline. */}
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px bg-linear-to-b from-gold/60 via-gold/35 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          {wedding.story.map((entry, i) => (
            <Bloom
              as="li"
              key={entry.id}
              order={i}
              className={`relative pl-9 pb-12 last:pb-0 md:w-1/2 md:pl-0 ${
                i % 2 === 0
                  ? "md:ml-0 md:pr-12 md:text-right"
                  : "md:ml-auto md:pl-12 md:text-left"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-gold/50 bg-ivory md:left-auto ${
                  i % 2 === 0 ? "md:-right-[7.5px]" : "md:-left-[7.5px]"
                }`}
              >
                <span className="block h-[5px] w-[5px] rounded-full bg-gold" />
              </span>

              <p className="eyebrow">{entry.when}</p>
              <h3 className="mt-2 font-display text-[26px] font-normal leading-tight text-wine">
                {entry.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink">{entry.body}</p>
            </Bloom>
          ))}
        </ol>
      </div>
    </section>
  )
}
