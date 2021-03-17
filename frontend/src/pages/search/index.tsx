import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FiSearch } from 'react-icons/fi'

import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import BookCard from '../../components/Home/BookCard'

type TOnKeyDownKey = string

const SearchPage: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [data, setData] = useState<any>(null) // array of book

  const onSearch = async (key: TOnKeyDownKey) => {
    if (key === 'Enter') {
      if (!search) return

      try {
        // const axiosInstance = axios.create({
        //   baseURL: process.env.NEXT_PUBLIC_SEARCH_API_ENDPOINT,
        //   method: 'GET',
        // })

        // const q = query?.q as string

        // const res = await axiosInstance.get('/docs', {
        //   headers: {
        //     'api-version': '2020-06-30-Preview',
        //     'api-key': process.env.NEXT_PUBLIC_SEARCH_API_KEY,
        //     search: q,
        //   },
        // })

        const res = await axios.post('/search', {
          text: search,
        })

        // kalau ada client error
        if (res.status !== 200) {
          console.error(res.data)
          toast.error(res.data.msg)
          return
        }

        setData(res.data.searchResults) // search results
      } catch (err) {
        console.error(err)
        toast.error(err.message)
      }
    }
  }

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
                {data ? data.length : '0'} Search Results
              </span>
            </div>

            {/* search */}
            <div className="relative w-72">
              <span className="absolute left-0 flex items-center pl-3 bottom-6">
                <FiSearch className="w-5 h-5 text-gray-500" />
              </span>

              <input
                className="w-full py-2 pl-10 pr-4 border rounded-md focus:border-red-500 focus:outline-none focus:shadow-outline"
                placeholder="Search book by title or author"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => onSearch(e.key)}
              />
            </div>
          </div>

          {/* books container */}
          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* books */}
            {data?.length > 0
              ? data?.map((book: any) => <BookCard key={book.id} book={book} />)
              : 'No Data'}
          </div>
        </div>
      </main>

      {/* footer */}
      <Footer />
    </div>
  )
}

export default SearchPage
