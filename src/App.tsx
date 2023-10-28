// import { ProductsManager } from './components/ProductsManager'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import './App.css'
import HomeProducts  from './components/HomeProducts'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import Error from './components/Error'
import Contact from './components/Contact'
import ProductDetails from './components/product/ProductDetails'
import User from './components/user/User'
import UserProfile from './components/user/UserProfile'
import UserOrders from './components/user/UserOrders'
import Admin from './components/admin/Admin'
import Category from './components/Category'
import AdminOrder from './components/admin/AdminOrder'
import Products from './components/product/Products'
import ListUser from './components/admin/ListUser'
import Login from './components/loggin/Login'
import ProtectRouterUser from './components/protectRouter/ProtectRouterUser'
import ProtectRouterAdmin from './components/protectRouter/ProtectRouterAdmin'
import Register from './components/loggin/Register'
import UserSideBar from './components/user/UserSideBar'

function App() {
  return (
    <div className="App">
      {/*<ProductsManager /> */}
   <BrowserRouter>
<NavBar />
<Routes>
  {/* when logout go to home page */}
<Route path='/' element={<HomeProducts />} />
  {/* for single page  */}
<Route path='/products/:name/:id' element={<ProductDetails />} />
<Route path='/contact' element={<Contact />} />
<Route path='/login' element={<Login pathName='/' />} />
<Route path='/register' element={<Register />} />
<Route path='/product' element={<ProductDetails />} />

<Route path='/dashboard' element={<ProtectRouterUser />}>  // this line to protected all inside in go to component and check if (isLoggedIn = true) then enter in all path
<Route path='user' element={<User />} />
<Route path='user/profile' element={<UserProfile />} />
<Route path='user/orders' element={<UserOrders />} />
</Route>

<Route path='/dashboard' element={<ProtectRouterAdmin />}> //protected admin page & check (isLoggedIn = true && userData?.role === 'admin') can not anu user enter except admin
<Route path='admin' element={<Admin />} />
<Route path='admin/category' element={<Category />} />
<Route path='admin/products' element={<Products />} />
<Route path='admin/orders' element={<AdminOrder />} />
<Route path='admin/users' element={<ListUser />} />
</Route>


<Route path='*' element={<Error />} />
</Routes>
<Footer/>
</BrowserRouter>
    </div>
  )
}

export default App
