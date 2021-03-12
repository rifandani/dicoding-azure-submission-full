import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'
import useSWR from 'swr'

import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import BookCard from './BookCard'
import Pagination from './Pagination'

const HomeComp: React.FC = () => {
  const { data, error } = useSWR('/books')
  const { push } = useRouter()

  const [currentPage, setCurrentPage] = useState<number>(0) // number => for pagination
  const [limit] = useState<number>(8) // number => for pagination
  const offset = currentPage * limit

  const currentBooks = data?.books
    .slice(offset, offset + limit)
    .map((book: any) => <BookCard key={book.id} book={book} />)

  return (
    <div className="bg-white">
      {/* header */}
      <Header />

      {/* main content */}
      <main className="my-8">
        <div className="container px-6 mx-auto">
          {/* content header */}
          <div className="flex justify-between">
            <div className="flex-col">
              <h3 className="text-2xl font-medium text-gray-700">
                Katalog Buku
              </h3>

              <span className="mt-3 text-sm text-gray-500">
                {data ? data.books.length : 'Total'} Books
              </span>
            </div>

            <button
              onClick={() => push('/create/book')}
              className="px-3 my-2 text-white bg-green-600 border rounded-md hover:bg-green-500"
            >
              + New Book
            </button>
          </div>

          {/* books container */}
          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* books */}
            {data?.books.length === 0 ? 'No Data' : currentBooks}

            {!error && !data ? 'Loading data' : null}

            {error ? 'Error fetching data' : null}
          </div>
        </div>
      </main>

      {/* pagination */}
      <Pagination
        books={data?.books}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
      />

      {/* footer */}
      <Footer />
    </div>
  )
}

export default HomeComp
