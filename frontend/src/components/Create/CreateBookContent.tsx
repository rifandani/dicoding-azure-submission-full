import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

const CreateBookContent: React.FC = () => {
  const { back, push } = useRouter()
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [releaseYear, setReleaseYear] = useState<string>('')
  const [synopsis, setSynopsis] = useState<string>('')
  const [image, setImage] = useState<any>(null)

  const onSubmitCreate = async (e: FormEvent) => {
    e.preventDefault()

    if (!title || !author || !releaseYear || !synopsis || !image) {
      return toast.error('Input all the form fields!')
    } else if (image.size > 2000000) {
      setImage(null)
      return toast.error('File size cannot exceed more than 2MB!')
    }

    // newBook
    const newBook = {
      title,
      author,
      releaseYear: parseInt(releaseYear),
      synopsis,
    }

    try {
      // create form-data => enctype: multipart/form-data
      const formData = new FormData()
      formData.append('image_uploads', image)

      // POST /upload
      const uploadResponse = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // kalau POST /upload response tidak success
      if (!uploadResponse?.data.success) {
        setImage(null)
        return toast.error(uploadResponse?.data.msg)
      }

      // POST /books
      const booksResponse = await axios.post('/books', {
        ...newBook,
        coverURL: uploadResponse?.data.coverURL,
      })

      // kalau PUT /books response tidak success
      if (!booksResponse?.data.success) {
        setTitle('')
        setAuthor('')
        setReleaseYear('')
        setSynopsis('')
        setImage(null)
        return toast.error(booksResponse?.data.msg)
      }

      // kalau POST /books success
      toast.success('Book created')
      await push('/')
    } catch (err) {
      console.error(err)
      toast.error('Something is gone wrong')
    }
  }

  return (
    <main className="p-4 mx-auto bg-white min-w-screen">
      <section className="p-3 md:grid md:grid-cols-3 md:gap-6">
        {/* Current book */}
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-bold leading-6 tracking-wide text-red-600 uppercase">
              Create New Book
            </h3>
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
    </main>
  )
}

export default CreateBookContent
