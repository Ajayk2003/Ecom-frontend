import { Outlet, Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { UserNav } from '@/components/UserNav'
import { Package2Icon, ShoppingCartIcon } from 'lucide-react'
import { Toaster } from './components/ui/toaster'
import { useAuth } from './auth/authContext'
import { useCartStore } from './hooks/useCartStore'
import { Badge } from './components/ui/badge'

export default function UserLayout() {
  const { user } = useAuth()
  const { cart } = useCartStore()

  if (!user) {
    return <Navigate to={'/login/user'} />
  }

  if (user && user.role !== 'user') {
    return <Navigate to={`/${user.role}`} />
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-evenly">
        <div className="container flex items-center justify-between">
          <nav className="hidden gap-4 text-sm font-medium lg:flex">
            <Link className="font-semibold hover:opacity-50" to="/">
              Home
            </Link>
            <Link className="font-semibold hover:opacity-50" to="/products">
              Products
            </Link>
            <Link className="font-semibold hover:opacity-50" to="/contact">
              Contact
            </Link>
            <Link className="font-semibold hover:opacity-50" to="/orders">
              Orders
            </Link>
          </nav>
          <Link className="flex items-center gap-2 font-semibold" to="/">
            <Package2Icon className="h-6 w-6" />
            <span>Azkaban</span>
          </Link>
          <div className="flex items-center justify-between  gap-8">
            <Link className="flex items-center space-x-2" to={'/cart'}>
              <ShoppingCartIcon className="h-6 w-6 cursor-pointer hover:opacity-50 " />
              {cart.length > 0 ? (
                <Badge className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" variant="outline">
                  {cart.length}
                </Badge>
              ) : (
                ''
              )}
            </Link>
            <UserNav />
          </div>
        </div>
      </header>
      <Outlet />
      <Toaster />
      <footer className="flex flex-col gap-2 items-center px-4 py-6 shrink-0 w-full">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Azkaban. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="/contact">
            Contact Us
          </Link>
          <a
            className="text-xs hover:underline underline-offset-4"
            href="https://www.linkedin.com/in/ajay-simson-k-10ba5424a/"
          >
            Developed by @ajay
          </a>
        </nav>
      </footer>
    </div>
  )
}
