import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import LoginPage from './pages/Login'
//Register pages
import UserRegister from './pages/Register'
import SellerRegister from './pages/seller/SellerRegister'
//Admin pages
import AdminLayout from './pages/admin/admin.layout'
import SellersPage from './pages/admin/Sellers'
import ProductsPage from './pages/admin/products'
import UsersPage from './pages/admin/Users'
//User pages
import UserLayout from './Layout'
import OrdersPage from './pages/user/Orders'
import HomePage from './pages/user/HomePage'
import Products from './pages/user/Products'
import Cart from './pages/user/Cart'
import Checkout from './pages/user/Checkout'
import ContactPage from './pages/Contact'
//Seller Pages
import SellerLayout from './pages/seller/Seller.layout'
import AdminOrders from './pages/admin/Orders'
import SellersProduct from './pages/seller/SellerProducts'
import SellerDashboard from './pages/seller/SellerDashBoard'
import SellerOrders from './pages/seller/SellerOrders'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Login routes */}
      <Route path="/login/user" element={<LoginPage role="user" />} />
      <Route path="/login/seller" element={<LoginPage role="seller" />} />
      <Route path="/login/admin" element={<LoginPage role="admin" />} />

      {/* Register routes */}
      <Route path="/register/user" element={<UserRegister />} />
      <Route path="/register/seller" element={<SellerRegister />} />

      {/* User route */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      {/* Other routes */}
      <Route path="/contact" element={<ContactPage />} />

      {/* Sellers Route */}
      <Route path="/seller" element={<SellerLayout />}>
        <Route index element={<SellerDashboard />} />
        <Route path="/seller/orders" element={<SellerOrders />} />
        <Route path="/seller/products" element={<SellersProduct />} />
      </Route>

      {/* Admin Route */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/" index element={<div> Dashboard </div>} />
        <Route path="/admin/sellers" element={<SellersPage />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Route>
    </>
  )
)

export default router
