import Link from 'next/link';
import AuthButton from '../atoms/AuthButton';

export default function Header() {
  return (
    <header>
      <nav>
        <Link href='/'>Home</Link>
        <AuthButton />
        <Link href='/add'>레시피추가</Link>
      </nav>
    </header>
  );
}
