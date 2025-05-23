'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      if (status === 'authenticated') {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Auth redirect error:', error);
      setHasError(true);
    }
  }, [session, status, router]);

  if (hasError) {
    return (
      <div className="flex h-screen justify-center items-center bg-black text-red-500">
        <p>⚠️ Something went wrong. Try clearing your cookies and refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen justify-center items-center bg-black text-yellow-400">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">🚀 Welcome to Our App</h1>
        <p className="text-lg text-yellow-300">Please sign in to continue</p>

        <button
          onClick={() => signIn('google')}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          🔐 Sign in with Google
        </button>
      </div>
    </div>
  );
}
