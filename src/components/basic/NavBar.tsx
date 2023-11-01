import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/user/userSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSignOut } from '@fortawesome/free-solid-svg-icons'
import CartShopping from './CartShopping'

function NavBar() {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReducer)
  const {cartItem} = useSelector((state: RootState) => state.cartReducer)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <>
    <div className='navBar'> 
      <nav>
        <ul>
          <li>
            <Link to="/" >
              Home{' '}
            </Link>
          </li>
          <li>
            <Link to="/" >
              Store{' '}
            </Link>
          </li>
          <li>
            <Link to="/" >
              About Me{' '}
            </Link>
          </li>

          {isLoggedIn && (
            <>
             
              <li>
                <Link to={`/dashboard/${userData?.role}`} >
                  {userData?.role}{' '}
                </Link>
              </li>
              <li>
                <Link to='/cart' >
                  <CartShopping value={cartItem.length > 0 ? cartItem.length : 0} />
                </Link>
              </li>
              <li>
                <Link to="/logout" onClick={handleLogOut} >
                <FontAwesomeIcon icon={faSignOut} className="" />
                </Link>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <>
              <li>
                <Link to="/login" >
                  login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      </div>
    </>
  )
}

export default NavBar
