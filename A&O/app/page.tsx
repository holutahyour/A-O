import Hero from "@/components/sections/Hero"
import Countdown from "@/components/sections/Countdown"
import Invitation from "@/components/sections/Invitation"
import Story from "@/components/sections/Story"
import TheDay from "@/components/sections/TheDay"
import Details from "@/components/sections/Details"
import Gallery from "@/components/sections/Gallery"
import Gifts from "@/components/sections/Gifts"
import Rsvp from "@/components/sections/Rsvp"
import Faq from "@/components/sections/Faq"
import Footer from "@/components/sections/Footer"

export default function Page() {
  return (
    <main>
      <Hero />
      <Countdown />
      <Invitation />
      <Story />
      <TheDay />
      <Details />
      <Gallery />
      <Gifts />
      <Rsvp />
      <Faq />
      <Footer />
    </main>
  )
}
