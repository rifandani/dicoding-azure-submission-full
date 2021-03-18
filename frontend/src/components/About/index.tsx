import React from 'react'
// import useSWR from 'swr'

import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import ContentSection from './ContentSection'

const AboutComp: React.FC = () => {
  return (
    <div className="bg-white">
      {/* header */}
      <Header />

      {/* main content */}
      <ContentSection
        version={1}
        level={1}
        name="Home"
        imageURL="https://raw.githubusercontent.com/rifandani/dicoding-azure-submission/master/ri-library.png"
      />
      <ContentSection
        version={2}
        level={2}
        name="Review"
        imageURL="https://raw.githubusercontent.com/rifandani/dicoding-azure-submission/master/book-detail.png"
      />

      {/* footer */}
      <Footer />
    </div>
  )
}

export default AboutComp
