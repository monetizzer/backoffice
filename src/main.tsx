import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/auth.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/login.tsx'
import Home from './pages/home.tsx'
import DiscordAuth from './pages/auth/discord.tsx'
import Documents from './pages/documents.tsx'
import Products from './pages/products.tsx'
import Product from './pages/product.tsx'

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
  {
    path: '/documents',
    element: <Documents />
  },
  {
    path: '/products',
    element: <Products />
  },
  {
    path: '/products/:productId',
    element: <Product />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
