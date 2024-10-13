import Link from 'next/link';
import AuthButton from '../atoms/AuthButton';

export default function Header() {
  return (
    <header>
      <nav>
        <AuthButton />
        <Link href='/'>Home</Link>
        <Link href='/auth/login'>Login</Link>
        <Link href='/add'>레시피추가</Link>
      </nav>
    </header>
  );
}
