import React from 'react'

import Header from './../Layout/Header'
import Footer from '../Layout/Footer'
import CreateBookContent from './CreateBookContent'

const CreateBook: React.FC = () => {
  return (
    <div className="bg-white">
      {/* header */}
      <Header />

      {/* form content */}
      <CreateBookContent />

      {/* footer */}
      <Footer />
    </div>
  )
}

export default CreateBook
