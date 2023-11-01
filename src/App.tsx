// import { ProductsManager } from './components/ProductsManager'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from './redux/store'

import './App.css'
import HomeProducts  from './components/basic/HomeProducts'
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

function App() {


  return (
    <div className="App">
      {/* <ProductsManager /> */}
   <BrowserRouter>
<Header />
<Routes>
  {/* when logout go to home page */}
<Route path='/' element={<HomeProducts />} />
  {/* for single page  */}
<Route path='/cart'  element={<Cart />} />
<Route path='/products/:name/:id' element={<ProductDetails />} />
<Route path='/login' element={<Login pathName='/' />} />
<Route path='/register' element={<Register />} />
<Route path='/product' element={<ProductDetails />} />

<Route path='/dashboard' element={<ProtectRouterUser />}>  // this line to protected all inside in go to component and check if (isLoggedIn = true) then enter in all path
<Route path='user' element={<User />} />
<Route path='user/profile' element={<UserProfile />} />
<Route path='user/editProfile' element={<EditProfile />} />
<Route path='user/orders' element={<UserOrders />} />
</Route>

<Route path='/dashboard' element={<ProtectRouterAdmin />}> //protected admin page & check (isLoggedIn = true && userData?.role === 'admin') can not anu user enter except admin
<Route path='admin' element={<Admin />} />
<Route path='admin/category' element={<Category />} />
<Route path='admin/products' element={<Products />} />
<Route path='admin/editProduct' element={<EditProduct />} />
<Route path='admin/addProduct'  element={<AddProduct />}  />
<Route path='admin/editCategory'  element={<EditCategory  />} />
<Route path='admin/orders' element={<AdminOrder />} />
<Route path='admin/users' element={<ListUser />} />
</Route>

<Route path='*' element={<Error />} />
</Routes>
<AboutMe />
<Footer/>
</BrowserRouter>
    </div>
  )
}

export default App
