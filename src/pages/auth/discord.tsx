import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';
import { useEffect } from 'react';

export default function DiscordAuth() {
  const [params] = useSearchParams()
  const redirect = useNavigate()
  const { setAccessToken, setUserData } = useAuthContext()
  const code = params.get('code')

  useEffect(() => {
    const login = async () => {
      if (
        !code ||
        typeof setAccessToken === 'undefined'
      ) return;

      const { accessToken } = await fetch(`${import.meta.env['VITE_API_URL']}/auth/discord`, {
        method: 'POST',
        body: JSON.stringify({
          code: code,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(r => r.json())
        .catch((e) => {
          console.error(e.message);
          redirect('/login')

          return;
        })

      const { accountId, isAdmin } = await fetch(`${import.meta.env['VITE_API_URL']}/auth/iam`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      })
        .then(r => r.json())
        .catch((e) => {
          console.error(e.message);
          redirect('/login')

          return;
        })

      setAccessToken(accessToken);
      setUserData({
        accountId,
        isAdmin,
      })
      redirect('/');
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
