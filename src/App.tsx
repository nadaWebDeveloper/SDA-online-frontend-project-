import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

import Footer from './components/basic/Footer'
import Error from './components/basic/Error'
import ProductDetails from './components/product/ProductDetails'
import User from './components/user/User'
import UserProfile from './components/user/UserProfile'
import UserOrders from './components/user/UserOrders'
import Admin from './components/admin/Admin'
import Category from './components/category/Category'
import AdminOrder from './components/admin/AdminOrder'
import Products from './components/product/Products'
import ListUser from './components/admin/ListUser'
import Login from './components/loggin/Login'
import ProtectRouterUser from './components/protectRouter/ProtectRouterUser'
import ProtectRouterAdmin from './components/protectRouter/ProtectRouterAdmin'
import Register from './components/loggin/Register'
import EditProfile from './components/user/EditProfile'
import Header from './components/basic/Header'
import AddProduct from './components/product/AddProduct'
import EditCategory from './components/category/EditCategory'
import EditProduct from './components/product/EditProduct'
import AboutMe from './components/basic/AboutMe'
import Cart from './components/basic/Cart'
import NavBar from './components/basic/NavBar'
import AddNewCategory from './components/category/AddNewCategory'
import StoreProduct from './components/basic/StoreProduct'
import AdminSideBar from './components/admin/AdminSideBar'
import UserSideBar from './components/user/UserSideBar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* when logout go to home page */}
          <Route path="/" element={<Header />} />
          <Route path="/storeProducts" element={<StoreProduct />} />
          <Route path="/aboutMe" element={<AboutMe />} />
          {/* for single page  */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:name/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login pathName="/" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<ProductDetails />} />

          {/* this line to protected all inside in go to component and check if (isLoggedIn = true) then enter in all path */}
          {/* <Route path="/dashboard"   element={
              <ProtectRouterUser>
                <UserSideBar />
              </ProtectRouterUser>
            }> */}
            <Route path="user" element={<User />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/editProfile" element={<EditProfile />} />
            <Route path="user/orders" element={<UserOrders />} />
          {/* </Route> */}

          {/* protected admin page & check (isLoggedIn = true && userData?.role === 'admin') can not anu user enter except admin */}
          {/* <Route path="/dashboard"    element={
              <ProtectRouterAdmin>
                <AdminSideBar />
              </ProtectRouterAdmin>
            }> */}
            <Route path="/dashboard" > 
            <Route path="admin" element={<Admin />} />
            <Route path="admin/category" element={<Category />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/editProduct" element={<EditProduct />} />
            <Route path="admin/addProduct" element={<AddProduct />} />
            <Route path="admin/editCategory" element={<EditCategory />} />
            <Route path="admin/addCategory" element={<AddNewCategory />} />
            <Route path="admin/orders" element={<AdminOrder />} />
            <Route path="admin/listUser" element={<ListUser />} />
          {/* </Route> */}
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App

