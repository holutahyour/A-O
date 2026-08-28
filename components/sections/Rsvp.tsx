"use client"

import { useState, type FormEvent } from "react"
import { wedding } from "@/data/wedding"
import Bloom from "@/components/motion/Bloom"
import Ornament from "@/components/motion/Ornament"
import SectionHeading from "@/components/ui/SectionHeading"

type Attending = "Both" | "Ceremony" | "Reception" | "Unable"

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
  const [adults, setAdults] = useState("1")
  const [message, setMessage] = useState("")

  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle")

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
          adults: Number(adults),
          message: message.trim(),
        }),
      })
      const data = await response.json().catch(() => ({ ok: false }))
      setStatus(response.ok && data.ok ? "sent" : "failed")
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

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="rsvp-attending" className="eyebrow mb-2 block">
                  Will you join us?
                </label>
                <select
                  id="rsvp-attending"
                  value={attending}
                  onChange={(e) => setAttending(e.target.value as Attending)}
                  className={FIELD}
                >
                  {ATTENDING.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="rsvp-adults" className="eyebrow mb-2 block">
                  Number of adults
                </label>
                <select
                  id="rsvp-adults"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  disabled={attending === "Unable"}
                  aria-describedby="rsvp-adults-note"
                  className={`${FIELD} disabled:opacity-50`}
                >
                  {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <p id="rsvp-adults-note" className="mt-1.5 text-[13px] text-muted">
                  Adults only — no children, please.
                </p>
              </div>
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

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-wine px-8 py-4 font-ui text-[12px] font-medium uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-wine-deep disabled:pointer-events-none disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send RSVP"}
            </button>
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
