import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut , faSignIn , faUser , faStore , faHome , faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import CartShopping from './CartShopping'
import AdminSideBar from '../admin/AdminSideBar'
import { logOutUser } from '../../redux/slices/user/userSlice'

function NavBar() {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReducer)
  const {cartItem} = useSelector((state: RootState) => state.cartReducer)
  const dispatch: AppDispatch = useDispatch()

  const handleLogOut = () => {
    if (confirm("Are you sure to Sign Out!")) {
      dispatch(logOutUser())
    } else {
      false    }
  }

  return (
    <div className='navBar'> 
      <nav>
       <ul>
        {/* for user  */}
      {isLoggedIn === true && userData?.isAdmin === false &&
   <>
       <li>
   <Link to="/" >
   <FontAwesomeIcon icon={faHome} className="" />
   </Link>
 </li>
 <li>
   <Link to="/storeProducts" >
   <FontAwesomeIcon icon={faStore} className="" />
   </Link>
 </li>
 <li>
  <Link to="/aboutMe" >
  <FontAwesomeIcon icon={faQuestionCircle} className="" />
   </Link>
 </li>
    <li>
      <Link to={`/dashboard/${userData && userData?.isAdmin ?'admin':'user'}`} >
        <FontAwesomeIcon icon={faUser} className="" />
      </Link>
    </li>
 <li>
<Link to='/cart' >
  <CartShopping value={cartItem.length > 0 ? cartItem.length : 0} />
</Link>
</li>
    <li>
       <Link to="/" onClick={handleLogOut} >
      <FontAwesomeIcon icon={faSignOut} className="" />
      </Link>
    </li>
  </>
 
  } 
 {/* for admin navbar */}
 {isLoggedIn === true && userData?.isAdmin === true  &&   <>  
 <li>
 <Link to="/" onClick={handleLogOut} >
 <FontAwesomeIcon icon={faSignOut} className="navbarLogOutAdmin" /> 
 </Link>
 <AdminSideBar />
 </li>
 <li>
 </li>
</>}

{/* for any visitor */}
 {isLoggedIn === false && 
   <>
    <li>
   <Link to="/" >
   <FontAwesomeIcon icon={faHome} className="" />
   </Link>
 </li>
 <li>
  <Link to="/storeProducts" >
  <FontAwesomeIcon icon={faStore} className="" />
  </Link>
 </li>
 <li>
   <Link to="/aboutMe" >
   <FontAwesomeIcon icon={faQuestionCircle} className="" />
  </Link>
 </li>
 <li>
<Link to='/cart' >
  <CartShopping value={cartItem.length > 0 ? cartItem.length : 0} />
</Link>
</li>
 <li>
 <Link to="/login" >
 <FontAwesomeIcon icon={faSignIn} className="" />
 </Link>
 </li>
   </>

     } 
       </ul>
      </nav>
      </div>
   
  )
}

export default NavBar