import { Dispatch, SetStateAction } from 'react'
import ReactPaginate from 'react-paginate'
// files

export interface PaginationProps {
  books: any
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  limit: number
}

const Pagination: React.FC<PaginationProps> = ({
  books,
  currentPage,
  setCurrentPage,
  limit,
}) => {
  const classNames =
    'bg-white text-red-500 hover:bg-red-100 px-2 py-1 border cursor-pointer rounded-md appearance-none focus:outline-none focus:ring focus:border-red-300 list-none'

  const pageCount = Math.ceil(books?.length / limit)

  return (
    <div className="flex flex-col items-center my-10">
      <article className="flex justify-center text-gray-500">
        Showing {limit * currentPage + 1} - {limit * (currentPage + 1)} of{' '}
        {books?.length} books
      </article>

      <ReactPaginate
        previousLabel="Previous"
        previousClassName={classNames}
        nextLabel="Next"
        nextClassName={classNames}
        breakLabel="..."
        breakClassName={classNames}
        containerClassName="flex justify-center my-5 gap-3"
        pageClassName={classNames}
        activeClassName="bg-red-100 appearance-none focus:outline-none focus:ring focus:border-red-300 list-none shadow-md"
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        onPageChange={(e) => setCurrentPage(e.selected)}
      />
    </div>
  )
}

export default Pagination
