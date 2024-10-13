'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { setUser, removeUser } from '@/lib/auth';

export default function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
      console.log('Google 로그인 성공:', session.user);
    }
  }, [session]);

  const handleSignIn = () => {
    router.push('/auth/login');
  };

  const handleSignOut = () => {
    signOut();
    removeUser();
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return session ? (
    <div>
      <span>Welcome, {session.user.name}</span>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  ) : (
    <button onClick={handleSignIn}>Login</button>
  );
}
