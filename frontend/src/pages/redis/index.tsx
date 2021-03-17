import { useRouter } from 'next/dist/client/router'
import React, { FormEvent, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import useSWR, { mutate } from 'swr'
import axios from 'axios'

import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'

const RedisPage: React.FC = () => {
  const { back } = useRouter()
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [releaseYear, setReleaseYear] = useState<string>('')
  const { data, error } = useSWR('/redis')

  const [tgl, bln] = useMemo(() => {
    const bookTgl = data?.book.createdAt

    const dateIntl = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(bookTgl)

    const tgl = dateIntl.split(',')[1].split(' ')[2] // ["", "March", "17"]
    const bln = dateIntl.split(',')[1].split(' ')[1] // ["", "March", "17"]

    return [tgl, bln]
  }, [data])

  const onSubmitCreate = async (e: FormEvent) => {
    e.preventDefault()

    if (!title || !author || !releaseYear) {
      return toast.error('Input all the form fields!')
    }

    try {
      const postData = {
        title,
        author,
        releaseYear,
      }

      const res = await axios.post('/redis', postData)

      // kalau POST /redis response tidak success
      if (!res?.data.success) {
        return toast.error(res?.data.msg)
      }

      // kalau POST /books success
      mutate('/redis')
      toast.success('Book created in redis cache')
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }

  return (
    <div className="bg-white">
      {/* header */}
      <Header />

      {/* main content */}
      <main className="p-4 mx-auto bg-white min-w-screen">
        <section className="p-3 md:grid md:grid-cols-3 md:gap-6">
          {/* Current book */}
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-bold leading-6 tracking-wide text-red-600 uppercase">
                Create New Book to Redis Cache
              </h3>

              <p className="mt-3 mb-1 text-sm italic text-gray-500">
                Redis version: {data ? data.version : 'Loading...'}
              </p>

              <p className="text-sm italic text-gray-500">
                PING command: {data ? data.ping : 'Loading...'}
              </p>
            </div>
          </div>

          {/* form */}
          <div className="mt-5 shadow-md md:mt-0 md:col-span-2">
            <form
              autoComplete="on"
              encType="multipart/form-data"
              onSubmit={(e) => onSubmitCreate(e)}
            >
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                  {/* title */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-4 sm:col-span-3">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Title
                      </label>

                      <input
                        id="title"
                        className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                        required
                        minLength={3}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* author */}
                  <div className="grid grid-cols-3 gap-6 mt-6">
                    <div className="col-span-4 sm:col-span-3">
                      <label
                        htmlFor="author"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Author
                      </label>

                      <input
                        id="author"
                        className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                        required
                        minLength={3}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* releaseYear */}
                  <div className="grid grid-cols-3 gap-6 mt-6">
                    <div className="col-span-4 sm:col-span-3">
                      <label
                        htmlFor="releaseYear"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Release Year
                      </label>

                      <input
                        id="releaseYear"
                        className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                        type="number"
                        required
                        value={releaseYear}
                        onChange={(e) => setReleaseYear(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                  <span className="inline-flex mr-3 rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
                    >
                      Submit
                    </button>
                  </span>

                  <span className="inline-flex rounded-md shadow-sm">
                    <button
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-blue active:bg-blue-700"
                      onClick={() => back()}
                    >
                      Back
                    </button>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* posted book from redis */}
        {data?.book ? (
          <section className="text-gray-600 body-font">
            <div className="container px-3 py-24 mx-auto">
              <div className="flex flex-wrap -mx-4 -my-8">
                <section className="px-4 py-8 lg:w-1/3">
                  <div className="flex items-start h-full">
                    <div className="flex flex-col flex-shrink-0 w-12 leading-none text-center">
                      <span className="pb-2 mb-2 text-gray-500 border-b-2 border-gray-200">
                        {tgl}
                      </span>

                      <span className="text-lg font-medium leading-none text-gray-800 title-font">
                        {bln}
                      </span>
                    </div>

                    <div className="flex-grow pl-6">
                      <h2 className="mb-1 text-xs font-medium tracking-widest text-indigo-500 title-font">
                        BOOK
                      </h2>

                      <h1 className="mb-5 text-xl font-medium text-gray-900 title-font">
                        {data?.book.title}
                      </h1>

                      <p className="mb-1 italic leading-relaxed">
                        {data?.book.releaseYear}
                      </p>

                      <a className="inline-flex items-center">
                        <span className="flex flex-col flex-grow">
                          <span className="italic font-medium text-gray-900 title-font">
                            {data?.book.author}
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        ) : (
          'No Book in Redis Cache'
        )}

        {error && 'Error fetching from redis'}
      </main>

      {/* footer */}
      <Footer />
    </div>
  )
}

export default RedisPage
