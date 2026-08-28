/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE ONLY FILE YOU NEED TO EDIT
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything the website says lives here. Change a bank account number, add a
 *  gift, reword an answer — all of it happens in this file. You should never
 *  need to open a component.
 *
 *  Anything marked TODO still needs real information from the couple.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type GiftCategory = "Kitchen" | "Living" | "Laundry" | "Power" | "Bedroom"

export type GiftItem = {
  id: string
  name: string
  category: GiftCategory
  targetNaira: number
  /** Optional product photo in /public. Leave unset for the ornamental tile. */
  imageUrl?: string
  /** Optional. Omit entirely and no progress bar is shown for this item. */
  contributedNaira?: number
}

export type Fund = {
  id: string
  name: string
  blurb: string
}

export type StoryEntry = {
  id: string
  title: string
  when: string
  body: string
}

export type GalleryImage = {
  src: string
  alt: string
}

export type Faq = { q: string; a: string }

export type InternationalAccount = {
  accountName: string
  bank: string
  currency: string
  accountNumber?: string
  sortCode?: string
  iban?: string
  swift?: string
}

export const wedding = {
  /* ── The couple ─────────────────────────────────────────────────────────── */
  couple: {
    bride: "Ayomide",
    groom: "Opeyemi",
    monogram: "AO",
    hashtag: "#AYOYEMIALWAYS&4VER",
  },

  /**
   * The ceremony as a fixed instant in time.
   * 26 September 2026, 12:00 noon in Lagos. Lagos is UTC+1 all year round
   * (West Africa Time, no daylight saving), so noon local is 11:00 UTC.
   * Stored as UTC so the countdown is correct from any timezone on earth.
   */
  ceremonyAt: "2026-09-26T11:00:00.000Z",

  /* ── The families, exactly as printed on the invitation ─────────────────── */
  families: {
    bride: "Evang. Olatunji and Late Mrs Abosede Israel Eweje",
    groom: "Apostle Bamidele & Pst Mrs Kemi Olaide Ogunbore",
  },

  /* ── Where ──────────────────────────────────────────────────────────────── */
  venues: {
    ceremony: {
      label: "The Ceremony",
      name: "The City of the Lord Church",
      address:
        "25, Kudirat Soule Str, off Coker Rd Orimolade Bus-stop, College Road, Ifako-Ijaiye, Lagos",
      time: "12:00 PM",
      // TODO(couple): replace with the exact pin from the QR code on the card
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=The+City+of+the+Lord+Church%2C+25+Kudirat+Soule+Street%2C+Ifako-Ijaiye%2C+Lagos",
    },
    reception: {
      label: "The Reception",
      name: "Lagos African Church Grammar School (LAFRO)",
      address: "College Bus stop, Ifako-Ijaiye, Lagos",
      time: "Follows immediately",
      // TODO(couple): replace with the exact pin from the QR code on the card
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Lagos+African+Church+Grammar+School+LAFRO%2C+College+Road%2C+Ifako-Ijaiye%2C+Lagos",
    },
  },

  /* ── Reaching the couple ────────────────────────────────────────────────── */
  rsvpPhones: [
    { display: "+234 906 665 5494", tel: "+2349066655494" },
    { display: "+234 703 064 2133", tel: "+2347030642133" },
  ],

  /* ── Colour of the day, straight off the card ───────────────────────────── */
  colours: [
    { name: "Blush Pink", hex: "#F2A6AC" },
    { name: "Champagne", hex: "#F3D7B4" },
  ],

  /* ── Where the gifts go ─────────────────────────────────────────────────── */
  bank: {
    // TODO(couple): supply the real account before launch. While these are
    // empty the transfer sheet shows a friendly "details coming soon" notice
    // with the RSVP numbers, rather than broken placeholder text.
    accountName: "",
    bankName: "",
    accountNumber: "",

    /**
     * Optional second account for guests sending from abroad.
     * Leave as null and the whole block is hidden — it is never half-rendered.
     */
    international: null as InternationalAccount | null,
  },

  /* ── The gift table ─────────────────────────────────────────────────────── */
  // TODO(couple): placeholders with estimated prices. Edit freely — rename,
  // reprice, remove, add your own. Set `imageUrl` to a photo in /public to
  // replace the ornamental tile. Add `contributedNaira` to show a progress bar
  // on an item; omit it and no bar appears.
  giftItems: [
    { id: "deep-freezer", name: "Deep Freezer", category: "Kitchen", targetNaira: 450000 },
    { id: "washing-machine", name: "Washing Machine", category: "Laundry", targetNaira: 520000 },
    { id: "gas-cooker", name: "Gas Cooker", category: "Kitchen", targetNaira: 380000 },
    { id: "smart-tv", name: "Smart Television", category: "Living", targetNaira: 650000 },
    { id: "generator", name: "Generator", category: "Power", targetNaira: 850000 },
    { id: "inverter", name: "Inverter & Battery", category: "Power", targetNaira: 1200000 },
    { id: "microwave", name: "Microwave Oven", category: "Kitchen", targetNaira: 180000 },
    { id: "air-fryer", name: "Air Fryer", category: "Kitchen", targetNaira: 195000 },
    { id: "water-dispenser", name: "Water Dispenser", category: "Kitchen", targetNaira: 160000 },
    { id: "granite-pots", name: "Granite Pot Set", category: "Kitchen", targetNaira: 145000 },
    { id: "speaker", name: "Bluetooth Speaker", category: "Living", targetNaira: 120000 },
    { id: "beddings", name: "Bedding Set", category: "Bedroom", targetNaira: 110000 },
    { id: "dinnerware", name: "Dinnerware Set", category: "Kitchen", targetNaira: 95000 },
    { id: "blender", name: "Blender", category: "Kitchen", targetNaira: 88000 },
    { id: "standing-fan", name: "Standing Fan", category: "Living", targetNaira: 85000 },
    { id: "pressing-iron", name: "Pressing Iron", category: "Laundry", targetNaira: 65000 },
    { id: "knife-set", name: "Knife Set", category: "Kitchen", targetNaira: 55000 },
    { id: "dish-rack", name: "Dish Rack", category: "Kitchen", targetNaira: 38000 },
  ] as GiftItem[],

  /* ── The love funds ─────────────────────────────────────────────────────── */
  funds: [
    {
      id: "honeymoon",
      name: "Honeymoon",
      blurb: "For a few quiet days to breathe, and a view neither of them has seen before.",
    },
    {
      id: "new-home",
      name: "New Home",
      blurb: "For the first keys, the first meals, and the rooms they will make their own.",
    },
    {
      id: "furnishing",
      name: "Home Furnishing",
      blurb: "For the sofa, the curtains, and everything that turns a house into theirs.",
    },
    {
      id: "car",
      name: "Car",
      blurb: "For the journeys, the errands, and the everyday movement of a shared life.",
    },
    {
      id: "bless-us",
      name: "Bless Us",
      blurb: "For anything at all. Give what is on your heart.",
    },
  ] as Fund[],

  /* ── Their story ────────────────────────────────────────────────────────── */
  // TODO(couple): every word below is placeholder. Replace with the real story —
  // where you met, how he asked, what you are looking forward to. Keep it short;
  // three or four sentences each reads best on a phone.
  story: [
    {
      id: "met",
      title: "How we met",
      when: "The beginning",
      body: "Some meetings feel ordinary until you look back at them. Ours was one of those — an unremarkable day that turned out to be the first page of everything after it.",
    },
    {
      id: "grew",
      title: "Growing together",
      when: "The years between",
      body: "Long conversations, shared prayers, and the slow discovery that we were building the same dream. Grace met us in the middle and has not left since.",
    },
    {
      id: "asked",
      title: "The question",
      when: "The yes",
      body: "He asked. She said yes. Two families rejoiced, and what had been a private hope became a promise spoken out loud.",
    },
    {
      id: "forever",
      title: "And now, forever",
      when: "26 September 2026",
      body: "We are stepping into a home built on grace, patience, and joy — and we would love for you to stand with us as we begin.",
    },
  ] as StoryEntry[],

  /* ── Photographs ────────────────────────────────────────────────────────── */
  // An empty array hides the gallery section entirely.
  gallery: [
    {
      src: "/gallery/03-portrait.jpeg",
      alt: "Ayomide resting her hand on Opeyemi's shoulder against a warm bronze backdrop",
    },
    {
      src: "/gallery/01-together.jpeg",
      alt: "Opeyemi in a deep green double-breasted suit with Ayomide leaning against his shoulder",
    },
    {
      src: "/gallery/02-hand-in-hand.jpeg",
      alt: "Ayomide and Opeyemi standing hand in hand, she in an ivory dress holding calla lilies",
    },
    {
      src: "/gallery/05-seated.jpeg",
      alt: "The couple seated side by side, Ayomide holding her bouquet of calla lilies",
    },
    {
      src: "/gallery/06-chair.jpeg",
      alt: "Ayomide seated in a wooden chair with her bouquet, Opeyemi standing behind her",
    },
    {
      src: "/gallery/04-shoulder.jpeg",
      alt: "A close portrait of Ayomide in a birdcage veil leaning on Opeyemi's shoulder",
    },
  ] as GalleryImage[],

  /* ── Questions guests actually ask ──────────────────────────────────────── */
  faq: [
    {
      q: "Can I bring my children?",
      a: "We love your little ones dearly, but this celebration is for adults only. Thank you for understanding, and for making arrangements ahead of the day.",
    },
    {
      q: "What should I wear?",
      a: "The colours of the day are blush pink and champagne. Wear them if you can — and if not, simply come dressed for a joyful celebration.",
    },
    {
      q: "What does “monetize all gifts” mean?",
      a: "It means the couple would love to receive gifts as cash rather than as items. It lets them buy exactly what their new home needs, and saves you carrying anything to the venue. Everything you need is in the gift section above.",
    },
    {
      q: "Can I bring a plus one?",
      a: "Our seating is planned around named guests. If you would like to bring someone, please call one of the RSVP numbers first so we can make room properly.",
    },
    {
      q: "How do I get to the reception?",
      a: "The reception is a short distance from the church, at Lagos African Church Grammar School by College Bus stop, and it begins immediately after the ceremony. Both venues have map links on this page.",
    },
    {
      q: "When should I RSVP by?",
      a: "As early as you can. It helps us plan seating and catering, and we would rather hear from you sooner than perfectly.",
    },
  ] as Faq[],

  /* ── Scripture, used sparingly ──────────────────────────────────────────── */
  scripture: {
    text: "Therefore what God has joined together, let no one separate.",
    ref: "Matthew 19:6",
  },
}

export type Wedding = typeof wedding

/** True once the couple have filled in real bank details. */
export const hasBankDetails = Boolean(
  wedding.bank.accountName && wedding.bank.bankName && wedding.bank.accountNumber,
)
