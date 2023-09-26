import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/auth.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/login.tsx'
import Home from './pages/home.tsx'
import DiscordAuth from './pages/auth/discord.tsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/auth/discord',
    element: <DiscordAuth />
  },
  {
    path: '/',
    element: <Home />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
