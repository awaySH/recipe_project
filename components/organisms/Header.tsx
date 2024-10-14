import Link from 'next/link';
import AuthButton from '../molecules/AuthButton';

export default function Header() {
  return (
    <header className='bg-main-green'>
      <nav className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <Link href='/' className='text-white text-3xl font-semibold'>
          만개의 레시피🤤
        </Link>
        <div className='flex items-center space-x-4'>
          <Link
            href='/add'
            className='text-white hover:text-sub-green transition-colors duration-200 font-semibold'
          >
            레시피 추가
          </Link>
          <AuthButton />
        </div>
      </nav>
    </header>
  );
}
