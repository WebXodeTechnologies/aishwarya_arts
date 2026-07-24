import React from 'react'
import ContactHeader from '../../components/Contact/ContactHeader'
import ContactInfoCards from '../../components/Contact/ContactInfoCards'
import ContactForm from '../../components/Contact/ContactForm'
import ContactMap from '../../components/Contact/ContactMap'

export const metadata = {
  title: "Contact Us | Aishwarya Arts Namakkal",
  description: "Get in touch with Aishwarya Arts Tanjore Art Gallery in Namakkal, Tamil Nadu. Reach out for custom paintings, pricing, and inquiries.",
  alternates: {
    canonical: "https://www.aishwaryaarts.com/contact",
  },
};

const page = () => {
  return (
      <div>
      <ContactHeader />
      <ContactForm />
      <ContactInfoCards />
      <ContactMap />
    </div>
  )
}

export default page