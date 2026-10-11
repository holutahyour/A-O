/**
 * Prepare the web copies of the photographs.
 *
 * Three of the originals were exported with white matting baked in, and one of
 * those (IMG_9851) also carries a thin gold rule down its left edge. In a
 * gallery they sat as small pictures floating inside white boxes while their
 * neighbours went full bleed.
 *
 * sharp's own .trim() is not enough here: the gold rule is not white, so it
 * anchors the bounding box and the matting survives. Instead we find the
 * *longest contiguous run* of non-white rows and columns. A stray 3px rule
 * separated from the photograph by white is its own short run and gets dropped.
 *
 * The gift photographs are a separate problem. They arrive at every shape from
 * 589x903 to 1170x666, and the gift grid asks for one 4:3 card. Cropping to fit
 * would slice the top off a refrigerator, so each one is instead *fitted whole*
 * onto a 4:3 blush canvas - the same blush the ornamental tile used, so the
 * grid still reads as one set whether a photo is portrait or landscape.
 *
 * The untouched originals stay in images/. Run with: node ./_images.cjs
 */
const sharp = require("sharp")
const fs = require("node:fs")
const path = require("node:path")

const MAX_EDGE = 1600
/** Greyscale mean at or above this counts as matting rather than picture. */
const WHITE = 238

const TARGETS = [
  { src: "images/IMG_9852.JPG.jpeg", out: "public/hero.jpeg" },
  { src: "images/IMG_9851.JPG.jpeg", out: "public/gallery/03-portrait.jpeg" },
  { src: "images/IMG_9847.JPG.jpeg", out: "public/gallery/01-together.jpeg" },
  { src: "images/IMG_9849.JPG.jpeg", out: "public/gallery/02-hand-in-hand.jpeg" },
  { src: "images/IMG_9853.JPG.jpeg", out: "public/gallery/05-seated.jpeg" },
  { src: "images/IMG_9854.JPG.jpeg", out: "public/gallery/06-chair.jpeg" },
  { src: "images/IMG_9852.JPG.jpeg", out: "public/gallery/04-shoulder.jpeg" },
  { src: "images/A&O Invitation Card.jpeg", out: "public/invitation.jpeg", noTrim: true },
]

/** Gift cards render at ~380px wide, so 800 covers a 2x screen with room spare. */
const GIFT_WIDTH = 800
const GIFT_HEIGHT = 600
/** --color-blush-50. The canvas the photo is fitted onto. */
const GIFT_BG = { r: 253, g: 241, b: 240 }

/** Keyed by the gift's `id` in data/wedding.ts - the output is /gifts/<id>.jpeg. */
const GIFTS = {
  refrigerator: "Refrigerator.jpeg",
  "heavy-duty-blender": "Heavy duty Blender.jpeg",
  "food-processor": "Food processor.jpeg",
  toaster: "Toaster.jpeg",
  "rice-cooker": "Rice Cooker.jpeg",
  juicer: "Juicer.jpeg",
  "non-stick-cookware": "Non stick cookwares.jpeg",
  "granite-cookware": "Granite cookware.jpeg",
  "deep-fryer": "Deep Fryer.jpeg",
  "washing-machine": "Automatic washing machine.jpeg",
  "air-conditioner": "Air conditioner.jpeg",
  "smart-tv": "Smart Tv.jpeg",
  soundbar: "Sound bar.jpeg",
}

/** Start and length of the longest run of `true` in a boolean array. */
function longestRun(flags) {
  let bestStart = 0
  let bestLen = 0
  let start = -1

  for (let i = 0; i <= flags.length; i++) {
    if (i < flags.length && flags[i]) {
      if (start === -1) start = i
    } else if (start !== -1) {
      if (i - start > bestLen) {
        bestLen = i - start
        bestStart = start
      }
      start = -1
    }
  }
  return { start: bestStart, length: bestLen }
}

async function contentBox(input) {
  const { data, info } = await sharp(input)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height } = info

  const colHasContent = new Array(width).fill(false)
  const rowHasContent = new Array(height).fill(false)

  // A row or column counts as picture if a real share of it is not white -
  // a single dark pixel should not rescue a white margin.
  const colDark = new Array(width).fill(0)
  const rowDark = new Array(height).fill(0)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[y * width + x] < WHITE) {
        colDark[x]++
        rowDark[y]++
      }
    }
  }

  for (let x = 0; x < width; x++) colHasContent[x] = colDark[x] > height * 0.12
  for (let y = 0; y < height; y++) rowHasContent[y] = rowDark[y] > width * 0.12

  const cols = longestRun(colHasContent)
  const rows = longestRun(rowHasContent)

  return {
    left: cols.start,
    width: Math.max(1, cols.length),
    top: rows.start,
    height: Math.max(1, rows.length),
    fullWidth: width,
    fullHeight: height,
  }
}

/** Fit each gift photograph whole onto a shared 4:3 blush card. */
async function gifts() {
  let before = 0
  let after = 0

  for (const [id, file] of Object.entries(GIFTS)) {
    const src = path.join("images/gifts", file)
    const out = path.join("public/gifts", `${id}.jpeg`)
    before += fs.statSync(src).size

    const tmp = out + ".tmp"
    await sharp(src)
      .resize({
        width: GIFT_WIDTH,
        height: GIFT_HEIGHT,
        fit: "contain",
        background: GIFT_BG,
        withoutEnlargement: false,
      })
      .flatten({ background: GIFT_BG })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(tmp)
    fs.renameSync(tmp, out)

    after += fs.statSync(out).size
    console.log(
      `${path.basename(out).padEnd(24)} ${GIFT_WIDTH}x${GIFT_HEIGHT}  ${file}`,
    )
  }

  console.log(`
${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(1)}MB (gifts)
`)
}

async function main() {
  const results = []
  let before = 0
  let after = 0

  for (const { src, out, noTrim } of TARGETS) {
    before += fs.statSync(src).size

    let pipeline = sharp(src)
    let note = "clean"

    if (!noTrim) {
      const box = await contentBox(src)
      const trimmed =
        box.width !== box.fullWidth || box.height !== box.fullHeight
      if (trimmed) {
        pipeline = sharp(src).extract({
          left: box.left,
          top: box.top,
          width: box.width,
          height: box.height,
        })
        note = `trimmed from ${box.fullWidth}x${box.fullHeight}`
      }
    }

    const tmp = out + ".tmp"
    await pipeline
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(tmp)
    fs.renameSync(tmp, out)

    const final = await sharp(out).metadata()
    after += fs.statSync(out).size
    results.push({ out, w: final.width, h: final.height })

    console.log(
      `${path.basename(out).padEnd(24)} ${String(final.width).padStart(4)}x${String(
        final.height,
      ).padEnd(5)} ${note}`,
    )
  }

  console.log(`\n${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(1)}MB\n`)
  console.log("Gallery dimensions for data/wedding.ts:")
  for (const r of results) {
    if (r.out.includes("gallery")) {
      console.log(`  ${r.out.replace("public", "")}  width: ${r.w}, height: ${r.h}`)
    }
  }

  console.log("")
  await gifts()
}

// `node ./scripts/prepare-images.cjs gifts` reruns just the gift cards, so
// adding one photograph does not rewrite every gallery file's bytes.
const only = process.argv[2]
const run = only === "gifts" ? gifts : main

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
