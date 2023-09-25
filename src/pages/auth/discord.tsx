'use client';

import { useAuthContext } from '@/context/auth';
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react';

export default function DiscordAuth() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { setAccessToken, setUserData } = useAuthContext()

  const code = searchParams?.get('code');

  useEffect(() => {
    console.log(setAccessToken);

    const login = async () => {
      if (
        !code ||
        typeof window === 'undefined' ||
        typeof setAccessToken === 'undefined'
      ) return;

      const { accessToken } = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/auth/discord`, {
        method: 'POST',
        body: JSON.stringify({
          code,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(r => r.json())
        .catch((e) => {
          console.log(e.message);
          router.push('/')

          return;
        })

      const { accountId, isAdmin } = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/auth/iam`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      })
        .then(r => r.json())
        .catch((e) => {
          console.log(e.message);
          router.push('/')

          return;
        })

      setAccessToken(accessToken);
      setUserData({
        accountId,
        isAdmin,
      })
      router.push('/home');
    }

    login();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, setAccessToken])

  return (
    <main>
      <p>
        Loading...
      </p>
    </main>
  )
}
