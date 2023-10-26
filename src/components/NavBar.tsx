import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../redux/slices/user/userSlice"
import { AppDispatch, RootState } from "../redux/store"

function NavBar() {

  const {isLoggedIn , userData} = useSelector((state: RootState) => state.usersReducer)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = () =>
 {
  dispatch(logout())
  navigate('/')
 }
  return (
<>

<nav>
    <ul>

  <li>
     <Link to="/">Home </Link>
        </li>
        <li>
        <Link to="/contact">Contact</Link>
        </li>
        <li>
        <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>

        {isLoggedIn && (
          <>
        <li>
       <Link to="/logout" onClick={handleLogOut}>logout</Link>
       </li>
        <li>
         <Link to={`/dashboard/${userData?.role}`}>{userData?.role} Dashboard</Link>
        </li>
          </>

        )}
       
    
        {/* <li>
          <Link to="/register">Register</Link>
        </li> */}
      {/* //if can log in then can show all this page
      {isLoggedIn && userData?.role === 'admin' ?
        <>
        <li>
       <Link to="/logout" onClick={handleLogOut}>logout</Link>
       </li>
        <li>
         <Link to="/dashboard/admin">Admin </Link>
        </li>
        <li>
         <Link to="/">Home </Link>
        </li>
        <li>
        <Link to="/contact">Contact</Link>
        </li>
       </> : 
       <>
     
       </>
      }


     { isLoggedIn && userData?.role === 'visitor' ?( 
      <>
       <li>
       <Link to="/logout" onClick={handleLogOut}>logout</Link>
       </li>
     <li> <Link to='/dashboard/user'>User</Link> </li>
     <li>
         <Link to="/">Home </Link>
        </li>
        <li>
        <Link to="/contact">Contact</Link>
        </li></>
     ) : (<>

     </>)} */}

       
    </ul>
</nav>
</>  
)}

export default NavBar