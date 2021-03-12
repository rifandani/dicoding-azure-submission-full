import { useRouter } from 'next/dist/client/router'
import React from 'react'
import useSWR from 'swr'

import Header from './../Layout/Header'
import Footer from '../Layout/Footer'
import BookSection from './BookSection'

const BookComp: React.FC = () => {
  const { query } = useRouter()
  const { data, error } = useSWR(`/books/${query?.id}`)

  return (
    <div className="bg-white">
      {/* header */}
      <Header />

      {!data && !error ? 'Loading' : null}

      {error ? 'Error fetching data' : null}

      {/* book content */}
      {data?.success ? <BookSection book={data?.book} /> : 'No Data'}

      {/* footer */}
      <Footer />
    </div>
  )
}

export default BookComp
