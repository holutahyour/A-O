"use client"

import { useRef, useState, type FormEvent } from "react"
import Image from "next/image"
import { wedding } from "@/data/wedding"
import Bloom from "@/components/motion/Bloom"
import Ornament from "@/components/motion/Ornament"
import SectionHeading from "@/components/ui/SectionHeading"

type Attending = "Both" | "Ceremony" | "Reception" | "Unable"

/**
 * Two things a guest can want from this one form: to be counted, or to be
 * counted *and* handed the invitation card. Both send the same details — only
 * what happens afterwards differs.
 */
type Intent = "rsvp" | "access"

type Errors = Partial<Record<"name" | "phone" | "email", string>>

const ATTENDING: { value: Attending; label: string }[] = [
  { value: "Both", label: "Ceremony & Reception" },
  { value: "Ceremony", label: "Ceremony only" },
  { value: "Reception", label: "Reception only" },
  { value: "Unable", label: "Unable to attend" },
]

const FIELD =
  "w-full rounded-lg border border-blush-200 bg-ivory px-4 py-3 font-ui text-[15px] text-ink " +
  "transition-colors placeholder:text-muted/60 hover:border-gold/50 focus:border-gold"

export default function Rsvp() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [attending, setAttending] = useState<Attending>("Both")
  const [message, setMessage] = useState("")

  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle")

  /**
   * Which button was pressed. The ref is what the submit handler reads — a
   * click and a submit are two separate events, so a state value set in the
   * click would still be the old one inside this render's handler. The state
   * copy exists only so the pressed button can show "Sending…" on itself.
   */
  const intentRef = useRef<Intent>("rsvp")
  const [pressed, setPressed] = useState<Intent>("rsvp")
  const [granted, setGranted] = useState(false)

  function choose(intent: Intent) {
    intentRef.current = intent
    setPressed(intent)
  }

  function validate(): Errors {
    const next: Errors = {}
    if (name.trim().length < 2) next.name = "Please tell us your full name."
    if (phone.replace(/[^0-9]/g, "").length < 7)
      next.phone = "Please enter a phone number we can reach you on."
    if (email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim()))
      next.email = "That email address does not look right."
    return next
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()

    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const intent = intentRef.current
    setStatus("sending")
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          attending,
          message: message.trim(),
          requestedCard: intent === "access",
        }),
      })
      const data = await response.json().catch(() => ({ ok: false }))
      const ok = response.ok && data.ok
      setGranted(ok && intent === "access")
      setStatus(ok ? "sent" : "failed")
    } catch {
      setStatus("failed")
    }
  }

  if (status === "sent") {
    return (
      <section id="rsvp" className="section bg-blush-50">
        <div className="shell max-w-xl text-center">
          <Bloom>
            <p className="eyebrow">Thank you</p>
            <h2 className="mt-4 font-display text-[clamp(30px,7vw,48px)] font-light text-wine">
              We have you down!
            </h2>
            <Ornament width={44} className="mt-6" />
            <p className="mt-6 text-[16px] leading-relaxed text-ink">
              Thank you, {name.split(" ")[0]}. Ayomide and Opeyemi cannot wait to celebrate
              with you on {""}
              <span className="whitespace-nowrap">26 September</span>.
            </p>
          </Bloom>

          {granted && (
            <Bloom order={1}>
              <p className="eyebrow mt-14">Your invitation</p>
              <a
                href="/invitation.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block overflow-hidden rounded-xl border border-blush-200 bg-ivory shadow-[0_18px_40px_-24px_rgba(107,18,34,0.35)] transition-colors hover:border-gold/50"
              >
                <Image
                  src="/invitation.jpeg"
                  alt={`The invitation card to the wedding of ${wedding.couple.bride} and ${wedding.couple.groom}`}
                  width={874}
                  height={1240}
                  sizes="(max-width: 640px) 88vw, 420px"
                  className="h-auto w-full"
                  priority
                />
              </a>

              <a
                href="/invitation.jpeg"
                download
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/60 px-7 py-3.5 font-ui text-[11px] font-medium uppercase tracking-[0.16em] text-wine transition-colors hover:border-gold hover:bg-champagne/30"
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
                Save the card
              </a>

              <p className="mt-4 text-[13px] leading-relaxed text-muted">
                Tap the card to open it full size.
              </p>
            </Bloom>
          )}
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="section bg-blush-50">
      <div className="shell max-w-2xl">
        <SectionHeading
          eyebrow="Kindly respond"
          title="RSVP"
          lead="Let us know you are coming so we can plan seating and catering properly. The earlier the better."
        />

        <Bloom order={1}>
          <form onSubmit={onSubmit} noValidate className="mt-12 space-y-5">
            <div>
              <label htmlFor="rsvp-name" className="eyebrow mb-2 block">
                Full name
              </label>
              <input
                id="rsvp-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "rsvp-name-error" : undefined}
                className={`${FIELD} ${errors.name ? "border-wine" : ""}`}
              />
              {errors.name && (
                <p id="rsvp-name-error" className="mt-1.5 text-[13px] text-wine">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="rsvp-phone" className="eyebrow mb-2 block">
                  Phone number
                </label>
                <input
                  id="rsvp-phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "rsvp-phone-error" : undefined}
                  className={`${FIELD} ${errors.phone ? "border-wine" : ""}`}
                />
                {errors.phone && (
                  <p id="rsvp-phone-error" className="mt-1.5 text-[13px] text-wine">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="rsvp-email" className="eyebrow mb-2 block">
                  Email <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  id="rsvp-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "rsvp-email-error" : undefined}
                  className={`${FIELD} ${errors.email ? "border-wine" : ""}`}
                />
                {errors.email && (
                  <p id="rsvp-email-error" className="mt-1.5 text-[13px] text-wine">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="rsvp-attending" className="eyebrow mb-2 block">
                Will you join us?
              </label>
              <select
                id="rsvp-attending"
                value={attending}
                onChange={(e) => setAttending(e.target.value as Attending)}
                aria-describedby="rsvp-attending-note"
                className={FIELD}
              >
                {ATTENDING.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <p id="rsvp-attending-note" className="mt-1.5 text-[13px] text-muted">
                Adults only — no children, please.
              </p>
            </div>

            <div>
              <label htmlFor="rsvp-message" className="eyebrow mb-2 block">
                A message for the couple{" "}
                <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <textarea
                id="rsvp-message"
                rows={4}
                maxLength={500}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${FIELD} resize-y`}
              />
              <p className="tabular mt-1.5 text-right text-[12px] text-muted">
                {message.length}/500
              </p>
            </div>

            {status === "failed" && (
              <div
                role="alert"
                className="rounded-lg border border-wine/30 bg-wine/5 px-4 py-3.5 text-[14px] leading-relaxed text-ink"
              >
                We could not send that just now. Please try again, or call{" "}
                {wedding.rsvpPhones.map((p, i) => (
                  <span key={p.tel}>
                    {i > 0 && " or "}
                    <a
                      href={`tel:${p.tel}`}
                      className="tabular font-medium text-wine underline decoration-gold/50 underline-offset-2"
                    >
                      {p.display}
                    </a>
                  </span>
                ))}{" "}
                and we will add you by hand.
              </div>
            )}

            {/* One set of details, two intents. Both buttons submit the same
                form; "Send and request access" additionally hands the guest the
                invitation card on the thank-you screen. */}
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="submit"
                onClick={() => choose("rsvp")}
                disabled={status === "sending"}
                className="w-full rounded-full bg-wine px-8 py-4 font-ui text-[12px] font-medium uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-wine-deep disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "sending" && pressed === "rsvp" ? "Sending…" : "Send RSVP"}
              </button>

              <button
                type="submit"
                onClick={() => choose("access")}
                disabled={status === "sending"}
                className="w-full rounded-full border border-gold/60 px-8 py-4 font-ui text-[12px] font-medium uppercase tracking-[0.16em] text-wine transition-colors hover:border-gold hover:bg-champagne/30 disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "sending" && pressed === "access"
                  ? "Sending…"
                  : "Send and request access"}
              </button>
            </div>

            <p className="text-center text-[13px] leading-relaxed text-muted">
              Send and request access — we will pass your details through, then show you the
              invitation card to keep and share with your household.
            </p>
          </form>
        </Bloom>

        <Bloom order={2}>
          <p className="mt-10 text-center text-[14px] leading-relaxed text-muted">
            Would rather call? Reach us on{" "}
            {wedding.rsvpPhones.map((p, i) => (
              <span key={p.tel}>
                {i > 0 && " or "}
                <a
                  href={`tel:${p.tel}`}
                  className="tabular font-medium text-wine underline decoration-gold/50 underline-offset-4"
                >
                  {p.display}
                </a>
              </span>
            ))}
            .
          </p>
        </Bloom>
      </div>
    </section>
  )
}
