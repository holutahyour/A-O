import { wedding } from "@/data/wedding"
import Bloom from "@/components/motion/Bloom"
import Ornament from "@/components/motion/Ornament"

/**
 * The centrepiece. The couple speak in their own voice here — the invitation
 * opens on the invitation itself, and the names are the only thing between it
 * and the scripture.
 */
export default function Invitation() {
  return (
    <section id="invitation" className="section relative">
      <div className="shell max-w-3xl text-center">
        <Bloom>
          <Ornament width={46} />
          <p className="mt-8 text-[15px] leading-relaxed text-ink">
            We cordially invite your presence to the
          </p>
          <p className="mt-4 font-display text-[clamp(32px,8vw,58px)] font-light leading-none text-wine">
            Wedding Ceremony
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink">of</p>
        </Bloom>

        <Bloom order={1}>
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

        <Bloom order={2}>
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
