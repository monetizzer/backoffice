'use client';

import { useAuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function AuthLayout({ children }: any): ReactNode {
  const router = useRouter();
  const { accessToken, userData } = useAuthContext();

  console.log('accessToken', accessToken);
  console.log('userData', userData);

  if ((!accessToken || !userData?.isAdmin) && typeof window !== 'undefined') {
    // router.push('/')

    return (<>Invalid</>)
  }

  return (
    <main>
      {children}
    </main>
  )
}
