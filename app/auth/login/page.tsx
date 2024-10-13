'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const handleLogin = async (provider: string) => {
    try {
      const result = await signIn(provider, {
        callbackUrl: '/',
        redirect: false,
      });
      if (result?.error) {
        console.error('Login failed:', result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => handleLogin('github')}>Login with Google</button>
      <button onClick={() => handleLogin('github')}>Login with GitHub</button>
    </div>
  );
}
