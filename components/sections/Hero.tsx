"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { wedding } from "@/data/wedding"
import { dottedDate } from "@/lib/format"
import { useGiftSheet } from "@/components/gift/GiftSheet"
import Monogram from "@/components/ui/Monogram"
import Ornament from "@/components/motion/Ornament"

export default function Hero() {
  const { open } = useGiftSheet()
  const reduced = useReducedMotion()

  /** Staggered entrance: each element follows the one before it. */
  const rise = (order: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 22, filter: "blur(5px)" },
    animate: reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: {
      duration: reduced ? 0.2 : 0.95,
      delay: reduced ? 0 : 0.15 + order * 0.13,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  })

  return (
    <section
      id="top"
      className="wash relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-20 pb-16"
    >
      <div className="shell grid items-center gap-12 lg:grid-cols-[1fr_minmax(300px,420px)] lg:gap-16">
        {/* ── The words ────────────────────────────────────────────────── */}
        <div className="text-center lg:text-left">
          <motion.div {...rise(0)}>
            <Monogram size={52} className="lg:items-start" />
          </motion.div>

          <motion.p {...rise(1)} className="eyebrow mt-8">
            Together with their families
          </motion.p>

          <motion.h1
            {...rise(2)}
            className="mt-5 font-display font-light text-[clamp(46px,13vw,96px)] leading-[0.95] text-wine"
          >
            {wedding.couple.bride}
            <span
              className="mx-3 inline-block align-middle font-script text-[clamp(52px,15vw,110px)] leading-none text-gold"
              aria-hidden="true"
            >
              &amp;
            </span>
            <span className="sr-only">and </span>
            <br className="hidden sm:block" />
            {wedding.couple.groom}
          </motion.h1>

          <motion.div {...rise(3)}>
            <Ornament width={48} className="mt-7 lg:justify-start" />
          </motion.div>

          <motion.p
            {...rise(4)}
            className="tabular mt-7 font-ui text-[13px] font-medium uppercase tracking-[0.22em] text-ink"
          >
            {dottedDate(wedding.ceremonyAt)}
            <span className="mx-3 text-gold" aria-hidden="true">
              |
            </span>
            Ifako-Ijaiye, Lagos
          </motion.p>

          {/* Blush is an accent, never a text colour — it fails contrast on
              ivory. The hashtag is information, so it gets wine. */}
          <motion.p {...rise(5)} className="eyebrow mt-3 text-wine/75">
            {wedding.couple.hashtag}
          </motion.p>

          <motion.div
            {...rise(6)}
            className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            <a
              href="#rsvp"
              className="rounded-full bg-wine px-8 py-4 font-ui text-[12px] font-medium uppercase tracking-[0.16em] text-ivory shadow-[0_10px_30px_-12px_rgba(142,27,46,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-wine-deep"
            >
              RSVP
            </a>
            <button
              type="button"
              onClick={() => open()}
              className="rounded-full border border-gold/60 px-8 py-4 font-ui text-[12px] font-medium uppercase tracking-[0.16em] text-wine transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-champagne/30"
            >
              Send a Gift
            </button>
          </motion.div>
        </div>

        {/* ── The portrait, in an arch ─────────────────────────────────── */}
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: reduced ? 0.2 : 1.1,
            delay: reduced ? 0 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto w-full max-w-[300px] lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-t-full rounded-b-2xl border border-gold/30"
          />
          <div className="relative aspect-3/4 overflow-hidden rounded-t-full rounded-b-2xl bg-blush-50">
            <Image
              src="/hero.jpeg"
              alt="Ayomide leaning on Opeyemi's shoulder in a birdcage veil, he in a deep green suit"
              fill
              priority
              sizes="(max-width: 1024px) 300px, 420px"
              className="object-cover object-[55%_28%]"
            />
          </div>
        </motion.div>
      </div>

      {/* ── Scroll cue ─────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 1.6, duration: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2"
      >
        <span className="eyebrow text-[9px] text-muted/70">Scroll</span>
        <motion.span
          className="block h-8 w-px bg-linear-to-b from-gold/70 to-transparent"
          animate={reduced ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  )
}
