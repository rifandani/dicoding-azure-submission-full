import React, { FormEvent, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { toast } from 'react-toastify'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import axios from 'axios'
import { mutate } from 'swr'

const ModalButton = (): JSX.Element => {
  return (
    <button className="flex items-center justify-center px-3 py-1 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500">
      <span>Edit Book</span>

      <AiFillEdit className="w-4 h-4 mt-1 ml-1" />
    </button>
  )
}

const Modal: React.FC<{ book: any }> = ({ book }) => {
  const [title, setTitle] = useState<string>(book.title)
  const [author, setAuthor] = useState<string>(book.author)
  const [releaseYear, setReleaseYear] = useState<string>(
    book.releaseYear.toString()
  )
  const [synopsis, setSynopsis] = useState<string>(book.synopsis)
  const [image, setImage] = useState<any>(null)

  const onSubmitEdit = async (e: FormEvent) => {
    e.preventDefault()

    if (!title || !author || !releaseYear || !synopsis || !image) {
      return toast.error('Input all the form fields!')
    } else if (image.size > 2000000) {
      setImage(null)
      return toast.error('File size cannot exceed more than 2MB!')
    }

    // editedBook
    const editedBook = {
      title,
      author,
      releaseYear: parseInt(releaseYear),
      synopsis,
    }
    const prevFileName = book.coverURL.split('/')[4]

    try {
      // create form-data => enctype: multipart/form-data
      const formData = new FormData()
      formData.append('image_uploads', image)

      // PUT req ke /upload
      const uploadResponse = await axios.put(
        `/upload?fileName=${prevFileName}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      // kalau server response tidak success
      if (!uploadResponse?.data.success) {
        setImage(null)
        return toast.error(uploadResponse?.data.msg)
      }

      // PUT /books
      const booksResponse = await axios.put(`/books/${book.id}`, {
        ...editedBook,
        coverURL: uploadResponse?.data.coverURL,
      })

      // kalau server response tidak success
      if (!booksResponse?.data.success) {
        setTitle('')
        setAuthor('')
        setReleaseYear('')
        setSynopsis('')
        setImage(null)
        return toast.error(booksResponse?.data.msg)
      }

      // kalau POST /books success
      toast.success('Book updated')
      mutate(`/books/${book.id}`, booksResponse?.data.book, true) // res.data.book === object book hasil response dari server
    } catch (err) {
      console.error(err)
      toast.error('Server error! Try again later')
    }
  }

  return (
    <Popup trigger={ModalButton} modal>
      {(close) => (
        <main className="bg-white">
          <section className="p-3 md:grid md:grid-cols-3 md:gap-6">
            {/* Current book */}
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-bold leading-6 tracking-wide text-red-600 uppercase">
                  Edit Book #{book.id}
                </h3>

                <p className="mt-3 text-sm italic leading-5 text-gray-600">
                  Created at {new Date(book.createdAt).toLocaleString()}.
                </p>

                <p className="mt-1 text-sm italic leading-5 text-gray-600">
                  Updated at {new Date(book.updatedAt).toLocaleString()}.
                </p>
              </div>
            </div>

            {/* form */}
            <div className="mt-5 shadow-md md:mt-0 md:col-span-2">
              <form
                autoComplete="on"
                encType="multipart/form-data"
                onSubmit={onSubmitEdit}
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
                          placeholder="Harper Lee"
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

                    {/* synopsis */}
                    <div className="mt-6">
                      <label
                        htmlFor="synopsis"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Synopsis
                      </label>

                      <textarea
                        id="synopsis"
                        className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                        placeholder="It's morbid, but have you ever wondered what books to read before you die?"
                        rows={5}
                        required
                        minLength={10}
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)}
                      />
                    </div>

                    {/* coverURL */}
                    <div className="mt-6">
                      <label
                        htmlFor="image_uploads"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Cover Photo
                      </label>

                      <div className="flex items-center mt-2">
                        {/* <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-md">
                          <img
                            className="w-full h-full"
                            src={image || '/noPhoto.png'}
                          />
                        </span> */}

                        <span className="rounded-md shadow-sm">
                          <input
                            className="px-3 py-2 text-sm font-medium leading-4 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                            id="image_uploads"
                            type="file"
                            accept="image/png, image/jpg, image/jpeg"
                            multiple={false}
                            // value={image}
                            onChange={(e) => {
                              // eslint-disable-next-line no-console
                              console.log(e.target.files)
                              setImage(e.target.files[0])
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                    <span className="inline-flex mr-3 rounded-md shadow-sm">
                      <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
                      >
                        Submit
                      </button>
                    </span>

                    <span className="inline-flex rounded-md shadow-sm">
                      <button
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-blue active:bg-blue-700"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </main>
      )}
    </Popup>
  )
}

export default Modal
