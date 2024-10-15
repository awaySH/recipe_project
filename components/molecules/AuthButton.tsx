'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // 서버 사이드 렌더링 시 아무것도 렌더링하지 않음

  const buttonClass =
    'font-semibold text-white hover:text-sub-green transition-colors duration-200';

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return session ? (
    <div className='flex items-center space-x-4'>
      <button onClick={() => signOut()} className={buttonClass}>
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
    <button onClick={() => signIn()} className={buttonClass}>
      로그인
    </button>
  );
}
