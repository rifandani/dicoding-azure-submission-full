import Link from 'next/link'
import axios from 'axios'
import React from 'react'
import { mutate } from 'swr'

export interface ProductCardProps {
  book: any
}

export const deleteBook = async (bookId: number): Promise<void> => {
  const isAgree = confirm('Are you sure you want to delete this?')
  if (!isAgree) return

  try {
    const res = await axios.delete(`/books/${bookId}`)
    mutate('/books')
    alert(res.data.msg)
  } catch (err) {
    console.error(err)
  }
}

const BookCard: React.FC<ProductCardProps> = ({ book }) => {
  return (
    <Link href={`/books/${book.id}`}>
      <div className="w-full max-w-sm mx-auto overflow-hidden rounded-md shadow-md cursor-pointer hover:shadow-xl">
        <div
          className="flex items-end justify-end w-full h-56 bg-cover"
          style={{
            backgroundImage: `url(${book.coverURL})`,
          }}
        >
          {/* <button
            onClick={() => deleteBook(book.id)}
            className="p-2 mx-5 -mb-4 text-white bg-red-600 rounded-full hover:bg-red-500 focus:outline-none focus:bg-red-500"
          >
            <FiTrash2 className="w-5 h-5 text-white" />
          </button> */}
        </div>

        {/* details */}
        <div className="px-5 py-3">
          <h3 className="font-bold text-gray-700 uppercase">{book.title}</h3>
          <p className="mt-2 italic text-gray-500">{book.releaseYear}</p>
          <span className="mt-2 italic text-gray-500">{book.author}</span>
        </div>
      </div>
    </Link>
  )
}

export default BookCard
