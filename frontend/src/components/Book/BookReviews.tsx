// import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fi'

const BookReviews: React.FC<{ reviewDetail: any }> = ({ reviewDetail }) => {
  return (
    <div className="flex-col w-full py-4 mb-2 bg-white border-b-2 border-r-2 border-gray-200 shadow-md sm:px-4 sm:py-4 sm:rounded-lg sm:shadow-sm md:w-2/3">
      <div className="flex flex-row">
        <div className="flex-col mt-1">
          {/* name */}
          <div className="flex items-center flex-1 px-4 font-bold leading-tight">
            {reviewDetail.reviewerName || 'Anonymous'}

            {/* updated at */}
            <span className="ml-2 text-xs font-normal text-gray-500">
              {new Date(reviewDetail.updatedAt).toLocaleString()}
            </span>
          </div>

          {/* reviews stars */}
          <div className="flex items-center flex-1 px-4 mt-1 text-sm text-gray-600">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <svg
                  key={i}
                  className={`${
                    reviewDetail.rating >= i + 1
                      ? 'text-blue-500'
                      : 'text-gray-400'
                  } h-4 w-4 fill-current`}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                </svg>
              ))}
          </div>

          {/* comment */}
          <div className="flex-1 px-2 mt-3 ml-2 text-sm font-medium leading-loose text-gray-600">
            {reviewDetail.comment}
          </div>

          {/* like button */}
          {/* <button className="inline-flex items-center px-1 -ml-1 flex-column">
            <FaRegThumbsUp className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600" />
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default BookReviews
