import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import { ReactNode, useEffect, useState } from "react";

export default function AuthLayout({ children }: any): ReactNode {
  const redirect = useNavigate()
  const {
    accessToken,
    userData,
    setAccessToken,
    setUserData
  } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
		const oldAccessToken = localStorage.getItem('access-token')
		if (oldAccessToken) {
			setAccessToken(oldAccessToken);
		}

		const oldUserData = localStorage.getItem('user-data')
		if (oldUserData) {
			setUserData(JSON.parse(oldUserData));
		}

    setIsLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isLoading && (!accessToken || !userData?.isAdmin)) {
      redirect('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])


  if (isLoading) {
    return (<>Loading...</>)
  }

  return (
    <main>
      {children}
    </main>
  )
}
