import { Link } from "react-router-dom"

function NavBar() {
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
        <Link to='/dashboard/user'>User</Link>
        </li>
        <li>
        <Link to="/dashboard/admin">Admin </Link>
        </li>
    </ul>
</nav>
</>  
)}

export default NavBar