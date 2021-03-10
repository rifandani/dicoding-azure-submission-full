const ReviewForm: React.FC = () => {
  const onSubmitReview = () => {
    alert('submit')
  }

  return (
    <main className="">
      {/* review form */}
      <section className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-sm font-bold tracking-wide text-red-600 uppercase">
                Review Form
              </h3>

              <p className="mt-3 text-sm italic text-gray-600">
                If you have read this book, then please consider to review this
                book. A book review is a form of literary criticism in which a
                book is merely described or analyzed based on content, style,
                and merit.
              </p>
            </div>
          </div>

          {/* form */}
          <section className="mt-5 shadow-md md:mt-0 md:col-span-2">
            <form onSubmit={onSubmitReview} autoComplete="on">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    {/* name */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Reviewer Name
                      </label>

                      <input
                        id="username"
                        className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                        required
                        minLength={3}
                      />
                    </div>

                    {/* rating */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="rating"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Rating
                      </label>

                      <select
                        className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                        id="rating"
                        required
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>

                    {/* comment */}
                    <div className="col-span-6">
                      <label
                        htmlFor="comment"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Comment
                      </label>

                      <textarea
                        id="comment"
                        className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                        rows={5}
                        required
                        minLength={10}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                  <button className="px-4 py-1 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-green-600">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </section>
    </main>
  )
}

export default ReviewForm
