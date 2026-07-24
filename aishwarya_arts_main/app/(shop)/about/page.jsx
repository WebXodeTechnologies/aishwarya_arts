import React from 'react'

import AboutVideo from '../../components/About/AboutVideo'
import ProfessionalJourney from '../../components/About/ProfessionalJourney'
import MissionVision from '../../components/About/MissionVision'
import WhyChoose from '../../components/About/WhyChoose'
import ContactAnimation from '../../components/About/ContactAnimation'

export const metadata = {
  title: "About Us | Aishwarya Arts Tanjore Art Gallery",
  description: "Learn about the heritage, journey, mission, and master craftsmanship behind Aishwarya Arts, creating authentic Tanjore gold foil paintings since 2000.",
  alternates: {
    canonical: "https://www.aishwaryaarts.com/about",
  },
};

const page = () => {
  return (
    <main>
      {/* <AboutVideo/> */}
      <ProfessionalJourney/>
      <MissionVision/>
      <WhyChoose/>
      <ContactAnimation/>
    </main>
  )
}

export default page