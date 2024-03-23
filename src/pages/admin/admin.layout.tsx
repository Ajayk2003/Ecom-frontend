import { Link, Navigate, Outlet } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/Input'
import { UserNav } from '@/components/UserNav'
import { cn } from '@/lib/utils'
import { HomeIcon, Package2Icon, ShoppingCartIcon, PackageIcon, SearchIcon, UsersIcon } from 'lucide-react'
import { useAuth } from '@/auth/authContext'
import { Toaster } from '@/components/ui/toaster'
import { useState } from 'react'

export default function AdminLayout() {
  const { user } = useAuth()
  const [tab, setTab] = useState('dashboard')
  if (!user) {
    return <Navigate to={'/login/user'} />
  }

  if (user && user.role !== 'admin') {
    return <Navigate to={`/${user.role}`} />
  }
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link className="flex items-center gap-2 font-semibold" to="#">
              <Package2Icon className="h-6 w-6" />
              <span className="">Azkaban </span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${}"
                to="/admin/dashboard"
              >
                <HomeIcon className="h-4 w-4" />
                DashBoard
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 "
                to="/admin/orders"
              >
                <ShoppingCartIcon className="h-4 w-4" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">12</Badge>
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 selection:bg-gray-50 selection:text-gray-900  transition-all hover:text-gray-900 "
                to="/admin/sellers"
              >
                <PackageIcon className="h-4 w-4" />
                Sellers
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                to="/admin/users"
              >
                <UsersIcon className="h-4 w-4" />
                Customers
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" to="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Recent Orders</h1>
          </div>
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
                  placeholder="Search orders..."
                  type="search"
                />
              </div>
            </form>
            <UserNav />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </div>
  )
}
