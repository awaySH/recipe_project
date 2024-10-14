'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';
import { setUser, removeUser } from '@/lib/auth';

export default function AuthButton() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
      console.log('로그인 성공:', session.user);
    }
  }, [session]);

  const handleSignIn = () => {
    signIn(); // NextAuth의 기본 로그인 페이지로 리다이렉트
  };

  const handleSignOut = () => {
    signOut();
    removeUser();
  };

  const buttonClass =
    'font-semibold text-white hover:text-sub-green transition-colors duration-200';

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return session ? (
    <div className='flex items-center space-x-4'>
      <button onClick={handleSignOut} className={buttonClass}>
        로그아웃
      </button>
      {session.user.image && (
        <Image
          src={session.user.image}
          alt={session.user.name || 'User profile'}
          width={32}
          height={32}
          className='rounded-full'
        />
      )}
    </div>
  ) : (
    <button onClick={handleSignIn} className={buttonClass}>
      로그인
    </button>
  );
}
