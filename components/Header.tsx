import Link from 'next/link';
import AuthButton from './AuthButton';

export default function Header() {
  return (
    <header>
      <nav>
        <Link href='/'>home</Link>
        <AuthButton />
      </nav>
    </header>
  );
}
