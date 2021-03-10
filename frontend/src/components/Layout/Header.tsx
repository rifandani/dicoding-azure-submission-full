import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useState } from 'react'
import { FiMapPin, FiMenu, FiBook } from 'react-icons/fi'
import { SiMicrosoftazure } from 'react-icons/si'

const Header: React.FC = () => {
  const { pathname } = useRouter()
  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <header>
      <div className="container px-6 py-3 mx-auto">
        <div className="flex items-center justify-between">
          <div className="hidden w-full text-gray-600 md:flex md:items-center">
            <FiMapPin className="w-5 h-5 hover:text-red-600" />

            <span className="mx-1 text-sm">ID</span>
          </div>

          <div className="flex items-center justify-center w-full text-2xl font-semibold text-gray-700 md:text-center">
            <FiBook className="w-6 mr-1" />

            <span className="">Ri-Library</span>
          </div>

          <div className="flex items-center justify-end w-full">
            <button className="mx-4 text-gray-600 focus:outline-none sm:mx-0">
              <SiMicrosoftazure className="w-5 h-5 hover:text-blue-600" />
            </button>

            <div className="flex sm:hidden">
              <button
                className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                aria-label="toggle menu"
                onClick={() => setToggle(!toggle)}
              >
                <FiMenu className="w-6 h-6 fill-current" />
              </button>
            </div>
          </div>
        </div>

        {/* NAV */}
        <nav
          className={`${
            toggle ? '' : 'hidden'
          } mt-4 sm:flex sm:justify-center sm:items-center`}
        >
          <div className="flex flex-col sm:flex-row">
            <Link href="/">
              <a
                className={`${
                  pathname === '/' ? 'text-red-600' : 'text-gray-600'
                } mt-3 hover:underline sm:mx-3 sm:mt-0`}
              >
                Home
              </a>
            </Link>

            <Link href="/about">
              <a
                className={`${
                  pathname === '/about' ? 'text-red-600' : 'text-gray-600'
                } mt-3 hover:underline sm:mx-3 sm:mt-0`}
              >
                About
              </a>
            </Link>
          </div>
        </nav>

        {/* search */}
        {/* <div className="relative max-w-lg mx-auto mt-6">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="w-5 h-5 text-gray-500" />
          </span>

          <input
            className="w-full py-2 pl-10 pr-4 border rounded-md focus:border-red-500 focus:outline-none focus:shadow-outline"
            placeholder="Search"
          />
        </div> */}
      </div>
    </header>
  )
}

export default Header
