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
      <ContentSection version={1} />
      <ContentSection version={2} />

      {/* footer */}
      <Footer />
    </div>
  )
}

export default AboutComp
