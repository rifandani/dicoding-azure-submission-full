import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { useRouter } from 'next/dist/client/router'

import { deleteBook } from '../Home/BookCard'
import ReviewForm from './ReviewForm'
import BookReviews from './BookReviews'
import Modal from '../Layout/Modal'

export interface BookSectionProps {
  book: any
}

const BookSection: React.FC<BookSectionProps> = ({ book }) => {
  const { author, coverURL, releaseYear, synopsis, title, id, review } = book

  const { push } = useRouter()

  // review rating algorithm
  const reviewRating =
    review.length > 0
      ? Math.round(
          review
            .map((el: any) => el.rating)
            .reduce((prev: number, curr: number) => prev + curr) / review.length
        )
      : 0

  return (
    <main className="flex items-center p-8 mx-auto bg-white min-w-screen">
      {/* image */}
      <article className="w-1/3">
        <div className="flex flex-col overflow-hidden rounded-lg shadow-2xl">
          <div className="flex items-center h-8 text-white bg-gray-900">
            <div className="w-3 h-3 ml-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 ml-2 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 ml-2 bg-green-400 rounded-full"></div>
          </div>

          <img
            src={coverURL}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
      </article>

      {/* content */}
      <article className="relative w-2/3 h-full pl-12">
        {/* edit and delete buttons */}
        <section className="flex items-center justify-between">
          <p className="text-sm font-bold tracking-wide text-red-600 uppercase">
            Book #{id}
          </p>

          <div className="flex items-center justify-center space-x-3">
            {/* edit button */}
            <Modal book={book} />

            {/* delete button */}
            <button
              className="flex items-center justify-center px-3 py-1 font-medium text-white bg-red-600 rounded-md hover:bg-red-500"
              onClick={async () => {
                await deleteBook(id)
                await push('/')
              }}
            >
              <span>Delete Book</span>

              <AiFillDelete className="w-4 h-4 mt-1 ml-1" />
            </button>
          </div>
        </section>

        {/* book title */}
        <h2 className="mt-5 text-4xl font-bold leading-tight text-gray-900">
          {title}
        </h2>

        {/* book author + releaseYear + synopsis */}
        <p className="mt-1 text-sm text-gray-600">
          {author} ({releaseYear})
        </p>
        <p className="mt-5 text-base italic text-gray-600">{synopsis}</p>

        {/* reviews stars */}
        <div className="flex items-center mt-3 text-sm text-gray-600">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <svg
                key={i}
                className={`${
                  reviewRating >= i + 1 ? 'text-blue-500' : 'text-gray-400'
                } h-4 w-4 fill-current`}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
              </svg>
            ))}
          <span className="ml-2">{review.length} reviews</span>
        </div>

        <hr className="px-20 my-6" />

        {/* ReviewForm comp */}
        <ReviewForm bookId={id} />

        <hr className="px-20 my-6" />

        {/* BookReviews comp */}
        <main className="relative flex items-center antialiased min-w-screen">
          <div className="container px-0">
            {review.length > 0
              ? review.map((reviewDetail: any, i: number) => (
                  <BookReviews key={i} reviewDetail={reviewDetail} />
                ))
              : null}
          </div>
        </main>
      </article>
    </main>
  )
}

export default BookSection
