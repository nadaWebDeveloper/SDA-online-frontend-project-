import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/user/userSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSignOut } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReducer)

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
            <Link to="/" className="noneLine">
              Home{' '}
            </Link>
          </li>
          <li>
            <Link to="/" className="noneLine">
              Store{' '}
            </Link>
          </li>
          <li>
            <Link to="/" className="noneLine">
              About Me{' '}
            </Link>
          </li>

          {isLoggedIn && (
            <>
             
              <li>
                <Link to={`/dashboard/${userData?.role}`} className="noneLine">
                  {userData?.role}{' '}
                </Link>
              </li>
              <li>
                <Link to="/logout" onClick={handleLogOut} className="noneLine">
                <FontAwesomeIcon icon={faSignOut} className="" />
                </Link>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <>
              <li>
                <Link to="/login" className="noneLine">
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
