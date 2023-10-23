import { Link } from "react-router-dom"

const UserSideBar =()=> {
  return (
<>
<aside className="sidebar">
<div>
  <h1>User Profile</h1>
  <p>nada yahya</p>
  <p>nadayahya@hotmail.com</p>
</div>

<ul>
  <li>
    <Link to='/dashboard/user/profile'>Profile</Link>
  </li>
  <li>
  <Link to='/dashboard/user/orders'>Order</Link>
  </li>
</ul>
</aside>
</>  )
}

export default UserSideBar