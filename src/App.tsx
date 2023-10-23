// import { ProductsManager } from './components/ProductsManager'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import './App.css'
import { HomeProducts } from './components/HomeProducts'
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

function App() {
  return (
    <div className="App">
      {/*<ProductsManager /> */}
   <BrowserRouter>
<NavBar />
<Routes>
<Route path='/' element={<HomeProducts />} />
<Route path='/contact' element={<Contact />} />
<Route path='/product' element={<ProductDetails />} />

<Route path='/dashboard/user' element={<User />} />
<Route path='/dashboard/user/profile' element={<UserProfile />} />
<Route path='/dashboard/user/orders' element={<UserOrders />} />

<Route path='/dashboard/admin' element={<Admin />} />
<Route path='/dashboard/admin/category' element={<Category />} />
<Route path='/dashboard/admin/products' element={<Products />} />
<Route path='/dashboard/admin/orders' element={<AdminOrder />} />

<Route path='*' element={<Error />} />
</Routes>
<Footer/>
</BrowserRouter>


      <HomeProducts />
    </div>
  )
}

export default App
