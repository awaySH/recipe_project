export default function NotFoundPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='text-center'>
        <div className='text-9xl mb-4'>🧑‍🍳</div>
        <div className='text-9xl font-bold text-gray-800'>404</div>
        <div className='text-2xl font-semibold text-gray-600 mt-4'>
          Oops! Page not found
        </div>
        <div className='text-gray-500 mt-4 mb-8'>
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </div>
        <a
          href='/'
          className='px-6 py-3 bg-main-green text-white font-semibold rounded-md hover:bg-sub-green transition duration-300 ease-in-out'
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
