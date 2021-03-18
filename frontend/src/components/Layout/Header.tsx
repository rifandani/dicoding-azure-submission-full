import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useState } from 'react'
import { FiMapPin, FiMenu, FiBook, FiX } from 'react-icons/fi'
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

          <div className="flex items-center justify-start w-full text-2xl font-semibold text-gray-700 sm:justify-center md:text-center">
            <FiBook className="w-6 mr-1" />

            <span className="">Ri-Library</span>
          </div>

          <div className="flex items-center justify-end w-full">
            <span className="mx-4 text-gray-600 focus:outline-none sm:mx-0">
              <SiMicrosoftazure className="w-5 h-5 hover:text-blue-600" />
            </span>

            <div className="flex sm:hidden">
              <button
                className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                aria-label="toggle menu"
                onClick={() => setToggle(!toggle)}
              >
                {toggle ? (
                  <FiX className="w-6 h-6 fill-current" />
                ) : (
                  <FiMenu className="w-6 h-6 fill-current" />
                )}
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

            <Link href="/search">
              <a
                className={`${
                  pathname === '/search' ? 'text-red-600' : 'text-gray-600'
                } mt-3 hover:underline sm:mx-3 sm:mt-0`}
              >
                Search
              </a>
            </Link>

            <Link href="/redis">
              <a
                className={`${
                  pathname === '/redis' ? 'text-red-600' : 'text-gray-600'
                } mt-3 hover:underline sm:mx-3 sm:mt-0`}
              >
                Redis
              </a>
            </Link>

            <Link href="/swagger">
              <a
                className={`${
                  pathname === '/swagger' ? 'text-red-600' : 'text-gray-600'
                } mt-3 hover:underline sm:mx-3 sm:mt-0`}
              >
                Swagger
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
      </div>
    </header>
  )
}

export default Header
