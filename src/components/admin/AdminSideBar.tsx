import { Link } from "react-router-dom"

const AdminSideBar = () => {
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
      <Link to='/dashboard/admin/category'>Category</Link>
    </li>
    <li>
      <Link to='/dashboard/admin/products'>Products</Link>
    </li>
    <li>
      <Link to='/dashboard/admin/orders'>Orders</Link>
    </li>
  </ul>
  </aside>
  </>  )
}

export default AdminSideBar