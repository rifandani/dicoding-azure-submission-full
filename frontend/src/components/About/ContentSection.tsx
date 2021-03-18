export interface ContentSectionProps {
  version: 1 | 2
  level: number
  name: string
  imageURL: string
}

const ContentSection: React.FC<ContentSectionProps> = ({
  version,
  level,
  name,
  imageURL,
}) => {
  if (version === 1)
    return (
      <main className="flex items-center p-8 mx-auto bg-white min-w-screen">
        {/* / image */}
        <article className="w-1/2">
          <div className="flex flex-col overflow-hidden rounded-lg shadow-2xl">
            <div className="flex items-center h-8 text-white bg-gray-900">
              <div className="w-3 h-3 ml-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 ml-2 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 ml-2 bg-green-400 rounded-full"></div>
            </div>
            <img
              src={imageURL || ''}
              alt={name}
              className="object-cover w-full h-full"
            />
          </div>
        </article>
        {/* // content */}
        <article className="relative w-1/2 h-full pl-12">
          <p className="text-sm font-bold tracking-wide text-red-500 uppercase">
            Screenshot #{level}
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-tight text-gray-900">
            {name} Features
            <br /> for Everyone to Enjoy.
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Perhaps the coolest features since the introduction of Poprocks!
            We&apos;ve got some rock&apos;n poppin features that will leave you
            wanting more. We&apos;ve got a jampacked feature set of awesomeness
            that will blow your pants right off!
          </p>
          <a
            href="/security-awareness-training-topics/"
            className="flex items-center mt-8 font-medium text-red-500 underline"
          >
            <span>View All Features</span>
            <svg
              className="w-4 h-4 mt-1 ml-1 transform -rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </a>
        </article>
      </main>
    )

  return (
    <main className="flex items-center p-8 mx-auto bg-white min-w-screen">
      {/* // content */}
      <article className="w-1/2">
        <p className="text-sm font-bold tracking-wide text-red-500 uppercase">
          Screenshot #{level}
        </p>
        <h2 className="mt-5 text-4xl font-bold leading-tight text-gray-900">
          {name} Features
          <br /> for Everyone to Enjoy.
        </h2>
        <p className="mt-3 text-base text-gray-600">
          Perhaps the coolest features since the introduction of Poprocks!
          We&apos;ve got some rock&apos;n poppin features that will leave you
          wanting more. We&apos;ve got a jampacked feature set of awesomeness
          that will blow your pants right off!
        </p>
        <a
          href="/security-awareness-training-topics/"
          className="flex items-center mt-8 font-medium text-red-500 underline"
        >
          <span>View All Features</span>
          <svg
            className="w-4 h-4 mt-1 ml-1 transform -rotate-45"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </a>
      </article>

      {/* image */}
      <article className="relative w-1/2 h-full pl-12">
        <div className="flex flex-col overflow-hidden rounded-lg shadow-2xl">
          <div className="flex items-center h-8 text-white bg-gray-900">
            <div className="w-3 h-3 ml-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 ml-2 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 ml-2 bg-green-400 rounded-full"></div>
          </div>
          <img
            src={imageURL || ''}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
      </article>
    </main>
  )
}

export default ContentSection
