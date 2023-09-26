import { ReactNode, createContext, useContext, useState } from 'react';

interface UserData {
	accountId: string
	isAdmin: boolean
}

interface AuthContextType {
	userData?: UserData
	accessToken?: string
	setUserData: (userData: UserData) => void
	setAccessToken: (accessToken: string) => void
}

const AuthContext = createContext<AuthContextType>({} as any);

export function AuthProvider({ children }: any): ReactNode {
  const [userData, setUserDataState] = useState<UserData>();
  const [accessToken, setAccessTokenState] = useState<string | undefined>();

	const setAccessToken = (accessToken: string) => {
		localStorage.setItem('access-token', accessToken)
		setAccessTokenState(accessToken)
	}

	const setUserData = (userData: UserData) => {
		localStorage.setItem('user-data', JSON.stringify(userData))
		setUserDataState(userData)
	}

  return (
    <AuthContext.Provider value={{
			userData,
			setUserData,
			accessToken,
			setAccessToken
		}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
	return useContext(AuthContext)
}