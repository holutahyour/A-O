import { wedding } from "@/data/wedding"
import Bloom from "@/components/motion/Bloom"
import Ornament from "@/components/motion/Ornament"

/**
 * The centrepiece — the printed card's own words, set the way the card sets
 * them. Every honorific here is load-bearing and must survive intact.
 */
export default function Invitation() {
  return (
    <section id="invitation" className="section relative">
      <div className="shell max-w-3xl text-center">
        <Bloom>
          <p className="eyebrow">The families of</p>
        </Bloom>

        <Bloom order={1}>
          <p className="mt-5 font-display text-[clamp(19px,4.4vw,26px)] leading-snug text-wine">
            {wedding.families.bride}
          </p>
          <p
            className="my-2 font-script text-4xl leading-none text-gold"
            aria-hidden="true"
          >
            &amp;
          </p>
          <p className="font-display text-[clamp(19px,4.4vw,26px)] leading-snug text-wine">
            {wedding.families.groom}
          </p>
        </Bloom>

        <Bloom order={2}>
          <Ornament width={46} className="mt-8" />
          <p className="mt-8 text-[15px] leading-relaxed text-ink">
            cordially invite your presence to the
          </p>
          <p className="mt-4 font-display text-[clamp(32px,8vw,58px)] font-light leading-none text-wine">
            Wedding Ceremony
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink">of their children</p>
        </Bloom>

        <Bloom order={3}>
          <p className="mt-6 font-display text-[clamp(26px,6.5vw,44px)] font-light leading-tight text-wine">
            {wedding.couple.bride}
            {/* The Italianno ampersand has a long tail and a narrow advance
                width, so it needs more room on the right than on the left. */}
            <span
              className="ml-2 mr-5 font-script text-[1.3em] text-gold"
              aria-hidden="true"
            >
              &amp;
            </span>
            <span className="sr-only">and </span>
            {wedding.couple.groom}
          </p>
        </Bloom>

        <Bloom order={4}>
          <Ornament width={40} className="mt-10" />
          <blockquote className="mt-7">
            <p className="mx-auto max-w-md font-display text-[17px] italic leading-relaxed text-muted">
              “{wedding.scripture.text}”
            </p>
            <cite className="eyebrow mt-4 block not-italic">{wedding.scripture.ref}</cite>
          </blockquote>
        </Bloom>
      </div>
    </section>
  )
}
