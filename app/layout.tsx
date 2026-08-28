import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Italianno, Jost } from "next/font/google"
import { wedding } from "@/data/wedding"
import { longDate } from "@/lib/format"
import { GiftSheetProvider } from "@/components/gift/GiftSheet"
import Bokeh from "@/components/motion/Bokeh"
import Header from "@/components/sections/Header"
import "./globals.css"

/* Display and headings. Deliberately not Playfair — that belongs to the
   invitation this site took inspiration from. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

/* One script, used for at most three words on the whole site. */
const italianno = Italianno({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italianno",
  display: "swap",
})

/* Everything functional: buttons, labels, forms, eyebrows. */
const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jost",
  display: "swap",
})

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

const TITLE = `${wedding.couple.bride} & ${wedding.couple.groom} · ${longDate(
  wedding.ceremonyAt,
).replace(/^[A-Za-z]+,\s*/, "")}`

const DESCRIPTION =
  `${wedding.couple.bride} and ${wedding.couple.groom} are getting married in Ifako-Ijaiye, Lagos. ` +
  `Join us for the ceremony, find your way to the reception, and bless our new home.`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: TITLE,
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#FFFBF8",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${italianno.variable} ${jost.variable}`}
    >
      <body>
        <Bokeh />
        <GiftSheetProvider>
          <Header />
          {children}
        </GiftSheetProvider>
      </body>
    </html>
  )
}
